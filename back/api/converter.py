import os
from flask import Blueprint, jsonify, request
import imageio
from moviepy.editor import *


convert = Blueprint('convert', __name__)


@convert.route('', methods=['POST'])
def convert_mp4():
  file = request.files['mp3'].filename
  print('hey its a file', file)
  if file:
    print('hey its a file again', file)
    video_clip = VideoFileClip(file)
    print('hey its the VideoFileClip', video_clip)
    audio_clip = video_clip.audio
    converted = audio_clip.write_audiofile("converted.mp3")

    video_clip.close()
    audio_clip.close()

    return  jsonify(converted)
  else:
    return {'error': 'something went wrong :('}
