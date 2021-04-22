import os
from flask import Blueprint, jsonify, request
import imageio
from moviepy.editor import *
from werkzeug.utils import *


convert = Blueprint('convert', __name__)


@convert.route('', methods=['POST'])
def convert_mp4():
  if request.files['mp3'].filename:
    os.getcwd()
    filename = request.files['mp3'].filename
    print('hey its a file again', filename)
    safe_filename = secure_filename(filename)
    video_file = os.path.join("/temp/", safe_filename)
    print('hey its the file path', video_file)
    video_clip = VideoFileClip(video_file)
    print('hey its the VideoFileClip', video_clip)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(os.path.join("/temp/", f"{safe_filename}-converted.mp3"))

    video_clip.close()
    audio_clip.close()

    return jsonify(send_from_directory(os.path.join("/temp/", f"{safe_filename}-converted.mp3")))
  else:
    return {'error': 'something went wrong :('}
