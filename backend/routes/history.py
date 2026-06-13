from flask import Blueprint, jsonify
from database.mongo import collection

history_bp = Blueprint("history_bp", __name__)

@history_bp.route("/history", methods=["GET"])
def history():
    data = list(collection.find({},{"_id":0}))
    return jsonify(data)