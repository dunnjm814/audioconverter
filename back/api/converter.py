from flask import Blueprint, jsonify
import imageio


imageio moviepy.editor


convert = Blueprint('convert', __name__)


@convert.route('')
def covert_mp4(file):
  video = moviepy.editor.VideoFileClip(file)
  audio = vid.audio

  converted = audio.write_audiofile("converted.mp3")

  return  converted
