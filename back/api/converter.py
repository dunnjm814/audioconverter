import os
from flask import Blueprint, jsonify, request, send_from_directory, make_response, send_file
import imageio
from moviepy.editor import *
from werkzeug.utils import *


convert = Blueprint('convert', __name__)


def to_dict(c_file):
  return {
    'mp3': c_file
  }

@convert.route('', methods=['POST'])
def convert_mp4():
  if request.files['mp3'].filename:
    os.getcwd()
    temp_path = "/home/jasondunn/projects/audioconverter/back/temp/"
    filename = request.files['mp3'].filename
    safe_filename = secure_filename(filename)

    video_file = os.path.join(temp_path, safe_filename)
    request.files['mp3'].save(video_file)
    video_clip = VideoFileClip(video_file)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(os.path.join(temp_path, f"{safe_filename}-converted.mp3"))

    video_clip.close()
    audio_clip.close()
    send_the_mp3 = send_from_directory(temp_path, f"{safe_filename}-converted.mp3", as_attachment=True, cache_timeout=0)
    # send_the_mp3 = send_file(temp_path, mimetype='audio/mpeg', attachment_filename=f"{safe_filename}-converted.mp3")
    # send_the_mp3 = os.path.join(temp_path, f"{safe_filename}-converted.mp3")
    print(send_the_mp3)
    # return send_from_directory(temp_path, f"{safe_filename}-converted.mp3", as_attachment=True, cache_timeout=0)
    # return to_dict(send_the_mp3)
    # return send_file(filename_or_fp=send_the_mp3, as_attachment=True, attachment_filename=f"{safe_filename}-converted.mp3")
    return send_the_mp3
  else:
    return {'error': 'something went wrong :('}
