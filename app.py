import os
import shutil
from flask import Flask, send_file, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

limiter = Limiter(key_func=get_remote_address, app=app)

@app.route("/download/<filename>")
@limiter.limit("1 per 3 minute")
def download(filename):
    # if share folder not exist, create it
    if not os.path.exists("share"):
        os.makedirs("share")

    file_path = os.path.join("share", filename)
    if os.path.exists(file_path):
        zip_filename = file_path + ".zip"
        shutil.make_archive(file_path, 'zip', file_path)
        
        # Send the file
        res = send_file(zip_filename, as_attachment=True)

        # Delete the temporary zip file after it's been sent
        # os.remove(zip_filename)

        return res
    else:
        return jsonify(error="file does not exist"), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False)
