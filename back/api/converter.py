import os
import threading
from flask import Blueprint, request, send_from_directory
from uuid import uuid4
from moviepy.editor import *
from werkzeug.utils import *


convert = Blueprint('convert', __name__)


def temp_dir_gen():
  os.getcwd()
  rand_dir_name=uuid4()
  temp_path="/home/jasondunn/projects/audioconverter/back/temp/"
  rand_temp_dir=os.path.join(temp_path, str(rand_dir_name))
  os.mkdir(rand_temp_dir)
  return rand_temp_dir


def temp_file_cleanup(path):
  if path:
    os.system(f'rm -rf {path}')
  else:
    return {'error': 'something went wrong :('}


@convert.route('', methods=['POST'])
def convert_mp4():
  if request.files['mp3'].filename:
    os.getcwd()
    test = temp_dir_gen()
    print(test)
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
    send_the_mp3 = send_from_directory(temp_path, f"{safe_filename}-converted.mp3", mimetype='audio/wav', as_attachment=True, cache_timeout=0)

    print(send_the_mp3)
    # threading.Thread(target=temp_file_cleanup(test)).start()
    threading.Timer(15.0, lambda: temp_file_cleanup(test)).start()

    return send_the_mp3

  else:
    return {'error': 'something went wrong :('}
