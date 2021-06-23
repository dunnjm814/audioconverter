import os
from flask import Blueprint, request, send_from_directory, g
from uuid import uuid4
from moviepy.editor import *
from werkzeug.utils import *



convert = Blueprint('convert', __name__)


def temp_dir_gen():
  cwd=os.getcwd()
  rand_dir_name=uuid4()
  temp_path=f"{cwd}/back/temp/"
  rand_temp_dir=os.path.join(temp_path, str(rand_dir_name))
  os.mkdir(rand_temp_dir)
  return rand_temp_dir


@convert.route('', methods=['POST'])
def convert_mp4():
  if request.files['mp3'].filename:
    temp_path = temp_dir_gen()
    g.path=temp_path
    filename = request.files['mp3'].filename
    safe_filename = secure_filename(filename)

    video_file = os.path.join(temp_path, safe_filename)
    request.files['mp3'].save(video_file)
    video_clip = VideoFileClip(video_file)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(os.path.join(temp_path, f"{safe_filename}-converted.mp3"))

    video_clip.close()
    audio_clip.close()
    send_the_mp3 = send_from_directory(temp_path, f"{safe_filename}-converted.mp3", mimetype='audio/mpeg', as_attachment=True, cache_timeout=0)

    return send_the_mp3

  else:
    return {'error': 'something went wrong :('}
