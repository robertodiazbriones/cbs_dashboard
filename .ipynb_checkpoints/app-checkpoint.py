from flask import Flask, render_template
import numpy as np
import pickle 
import requests



app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))


def api():
    url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/washington%20d.c./today?unitGroup=us&key=4TL5LFAY3PFAMN97VCTQRXQHR&include=current"
    response = requests.get(url)
    response_json = response.json()

    temp = float(response_json['currentConditions']['temp'])
    hum = float(response_json['currentConditions']['humidity'])
    precip = float(response_json['currentConditions']['precip'])
    feels = float(response_json['currentConditions']['feelslike'])
    print(f"Temperature: {temp} F")
    print(f"Humidity: {hum}%")
    print(f"Precipitation: {precip}")
    print(f"Feels Like: {feels} F")
    current = [temp, hum, precip, feels]
    current = np.array(current).reshape(1,-1)
    return current


@app.route('/')
def home():

    return render_template('index.html')


@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    values = api()
    prediction = model.predict(values)[0][0]
    return render_template('index.html', prediction_text='Based on current weather conditions, there are an estimated {} bikes in use.'.format(round(prediction)))
    # return render_template('index.html', prediction_text=output)

@app.route('/whatever')
def map():

    return render_template('whatever.html')

if __name__ == "__main__":
    app.run(debug=True)