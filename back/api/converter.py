from flask import Blueprint, jsonify
import imageio
from moviepy.editor import *

# imageio moviepy.editor


convert = Blueprint('convert', __name__)


@convert.route('')
def covert_mp4():
  file = request.files[0]
  print('hey its a file', file)
  video = VideoFileClip(file)
  audio = vid.audio

  converted = audio.write_audiofile("converted.mp3")

  return  jsonify(converted)
