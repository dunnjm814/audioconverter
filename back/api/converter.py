from flask import Blueprint, jsonify, request
import imageio
from moviepy.editor import *

# imageio moviepy.editor


convert = Blueprint('convert', __name__)


@convert.route('', methods=['POST'])
def covert_mp4():
  file = request.files['mp3']
  print('hey its a file', file)
  if file:
    video = VideoFileClip(file)
    audio = vid.audio

    converted = audio.write_audiofile("converted.mp3")

    return  jsonify(converted)
  else:
    return {'error': 'something went wrong :('}
