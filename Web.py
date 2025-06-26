from flask import Flask, jsonify, request
from flask import render_template

import APIWeatherInfo as APIWeatherInfo 




app = Flask(__name__)


@app.route('/')
def home():
    
    return render_template('index.html')

@app.route('/credits.html')
def credits():

    return render_template('credits.html')

@app.route('/getInfo', methods=['POST'])
def getInfo():
    passedInData = request.get_json()
    lat = passedInData.get('latitude')
    lon = passedInData.get('longitude')
    
    '''use line below for delpyoment'''
    #info = APIWeatherInfo.dynamicReturn(lat, lon)
    '''line below for testing'''
    info = APIWeatherInfo.returnTestData()
    return jsonify(info)

if __name__ == '__main__':
    app.run(debug=True)



