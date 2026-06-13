from flask import Flask
from routes.check import check_bp
from routes.history import history_bp
from routes.stats import stats_bp


app = Flask(__name__)

app.register_blueprint(check_bp)
print(app.url_map)
app.register_blueprint(history_bp)
app.register_blueprint(stats_bp)

@app.route("/")
def home():
    return "Phishing Detection Backend Running"

if __name__ == "__main__":
    app.run(debug=True)


