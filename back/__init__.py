import os
from flask import Flask, request, redirect, g
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf

from .api.converter import convert

from .config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(convert, url_prefix='/api/convert')

CORS(app)


def temp_file_cleanup(path):
    if path:
        os.system(f'rm -rf {path}')
    else:
        return {'error': 'something went wrong :('}

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        g.path=''
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict'
        if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True)
    if g.path:
        temp_file_cleanup(g.path)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
