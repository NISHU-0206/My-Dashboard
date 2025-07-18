from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    try:
        with open('jsondata.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
    except FileNotFoundError:
        return jsonify({'error': 'JSON file not found'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 500

    filters = {
        "topic": request.args.get("topic"),
        "sector": request.args.get("sector"),
        "country": request.args.get("country"),
        "region": request.args.get("region"),
        "end_year": request.args.get("endYear"),
        "pest": request.args.get("pest"),
        "source": request.args.get("source"),
        "swot": request.args.get("swot"),
        "city": request.args.get("city")
    }

    # Filter data (case-insensitive match)
    filtered_data = [
        d for d in data if all(
            not filters[key] or str(d.get(key, "")).lower() == filters[key].lower()
            for key in filters
        )
    ]

    return jsonify(filtered_data)

if __name__ == '__main__':
    app.run(debug=False)
