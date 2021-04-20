import os
import flask from Flask, request, redirect
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf

from .api.converter import convert

app = Flask(__name__)

app.register_blueprint(convert, url_prefix='/api/convert')

CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict'
        if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True)
    return response
