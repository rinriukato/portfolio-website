from flask import Flask, render_template
from flask_bootstrap import Bootstrap5

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/skills', methods=['GET'])
def skills():
    return render_template('skills.html')


@app.route('/about-me', methods=['GET'])
def about_me():
    return render_template('about-me.html')


@app.route("/featured-projects", methods=['GET'])
def projects():
    return render_template('projects.html')


if __name__ == "__main__":
    app.run(debug=True)
