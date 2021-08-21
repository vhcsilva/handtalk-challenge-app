import { getFramesFromURL } from '../services/api'
import { fbStorage, fbFirestore } from '../services/firebase'
import { CutArea } from '../types/global'
import firebase from 'firebase'

const useFirebase = () => {
  const storage = fbStorage
  const firestore = fbFirestore

  const createNewVideo = async (file: File) => {
    let videoRef = await firestore.collection('videos').add({
      createdAt: new Date(),
      numberOfParts: 0,
      name: file.name
    })

    if (!videoRef.id)
      throw Error('Attempt to upload the video failed.')

    let storageRef = storage.ref().child(`/videos/${videoRef.id}.mp4`)
    let uploaded = await storageRef.put(file)

    if (uploaded.state !== 'success') {
      await videoRef.delete()

      throw Error('Attempt to upload the video failed.')
    }

    let id = videoRef.id
    let name = file.name
    let url = await storageRef.getDownloadURL()

    let framesRes = await getFramesFromURL(videoRef.id, url)

    if (framesRes.status !== 'success') {
      await videoRef.delete()
      await storageRef.delete()

      throw Error('Attempt to upload the video failed.')
    }

    let frames = framesRes.data

    let jsonFile = new Blob([JSON.stringify(frames)], {type: 'application/json'})

    let storageRefFrames = storage.ref().child(`/frames/${videoRef.id}.json`)
    let uploadedFrames = await storageRefFrames.put(jsonFile)

    if (uploadedFrames.state !== 'success') {
      await videoRef.delete()
      await storageRef.delete()
      await storageRefFrames.delete()

      throw Error('Attempt to upload the video failed.')
    }

    return { id, url, frames, name }
  }

  const saveVideoCuts = async (videoId: string, cuts: CutArea[]) => {
    let numberOfParts = cuts.length
    let batch = firestore.batch()

    cuts.forEach(cut => {
      let docRef = firestore.collection('partsOfVideos').doc()

      batch.set(docRef, {
        startFrame: cut.begin,
        endFrame: cut.begin + 50,
        videoId
      })
    })

    await batch.commit()

    await firestore.collection('videos').doc(videoId).update({
      numberOfParts
    })

    return true

  }

  const listVideos = async () => {
    let snapshot = await firestore.collection('videos').get()
    let videos: firebase.firestore.DocumentData[] = []

    snapshot.forEach((video: firebase.firestore.DocumentData) => {
      let tmp = video.data()

      videos.push({
        id: video.id,
        name: tmp.name,
        createdAt: tmp.createdAt.toDate().toLocaleString('pt-br'),
        numberOfParts: tmp.numberOfParts
      })
    })

    return videos
  }

  const getFrames = async (videoId: string) => {
    let url = await storage.ref().child(`frames/${videoId}.json`).getDownloadURL()
    let rs = await fetch(url)
    let frames = await rs.json()

    return frames
  }

  const getCuts = async (videoId: string) => {
    let snapshot = await firestore.collection('partsOfVideos').where('videoId', '==', videoId).get()
    let cuts: any[] = []

    snapshot.forEach(doc => {
      cuts.push({
        id: doc.id,
        startFrame: Math.ceil(doc.data().startFrame),
        endFrame: Math.ceil(doc.data().endFrame),
      })
    })

    return cuts
  }

  return {
    storage,
    firestore,
    createNewVideo,
    saveVideoCuts,
    listVideos,
    getFrames,
    getCuts
  }
}

export default useFirebase