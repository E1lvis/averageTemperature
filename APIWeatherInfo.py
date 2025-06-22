import requests
import json
import pandas
import matplotlib.pyplot as plt
from datetime import date, datetime
from meteostat import Daily, Point

'''flow of code: API call -> passing in the json[dataseries] into averageWeatherPerday -> createinformationDict'''


lat = 34.92
lon = -82.22

def weatherAPICall(lat: float, long: float) -> json:
    '''returns full json with information from 7timer api'''
    '''excerpt of return json: {'product': 'civil', 'init': '2025062112', 'dataseries': [{'timepoint': 3, 'cloudcover': 1, 'lifted_index': 2, 
'prec_type': 'none', 'prec_amount': 0, 'temp2m': 31, 'rh2m': '39%', 'wind10m': {'direction': 'SE', 'speed': 2}, 'weather': 'clearday'},'''
    params = {
        'unit' : 'british',
        'lon' : str(long),
        'lat' : str(lat),
        'product' : 'civil',
        'output' : 'json'
    }

    url = 'http://www.7timer.info/bin/api.pl?'

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        
    return data



#print(dataToUse)
#for specific use with the json returned from API call, passing in the dataseries list of dict from JSON
def averageWeatherPerDay(dataset: list) -> dict:
    '''creates averages by parsing through the dataset passed through, genreally the weather api call'''
    #example return = {'day 1': {'temp': '29.0', 'weather': 'pcloudynight'}, 'day 2': {'temp': '30.8', 'weather': 'pcloudynight'}

    averages = {

    }

    day = 1

    #adding every temp recored, then dividing by 8 as that is the amount recored per day
    averageTemp = 0

    for hashTable in dataset:

        #when we reach a number divisble by 24, we reset and add to averages
        averageTemp += hashTable.get('temp2m')
        
        if hashTable.get('timepoint') % 24 == 0:
            # // doubke slash gets whole number
            averages.update({'day ' + str(day): {
                'temp': str((f'{averageTemp/8:.1f}')),
                'weather': hashTable.get('weather')
                }
                })
            averageTemp = 0
            day += 1
  
    return averages

#passing in the returned hashTable from average function
def createGraph(dataset: dict, ):
    x = []
    y = []
    for key in dataset:
        x.append(key)
        y.append(float(dataset.get(key)))

    
    
    
    
    
    
    plt.bar(x,y)
    plt.xlabel('test X label')
    plt.ylabel('test y label')
    plt.title('test Title')
    
    plt.ylim(bottom=(min(y))-5)
    plt.show()
    

    return


def createInformationDict(dataset: dict, lat: float, lon: float) -> dict:
    '''creates information dict example: {day + day: {currentTemp: temp, offsetTemp: temp}}'''
    #example: {day + day: {currentTemp: temp, offsetTemp: temp}}'''
    informationDict={

        

    }

    day = 0
    #getting todays date for start, will need to convert it to tuple then grab only needed info, remember this is for a year ago so subrtact 1 from year
    start = makeDateTuple(lat, lon, day+1)
    end = start
    location = Point(lat, lon)

    #info needed is average temp
    for data in dataset:
        
        informationDict.update(
            {'Day ' + str(day): {
                'currentAverage': dataset.get(data).get('temp'),
                'offsetAverage': Daily(location, start, end).fetch()['tavg'][0],
                'weather': dataset.get(data).get('weather')
        }})

        day += 1
        start = makeDateTuple(lat, lon, day+1)
        
    return informationDict



def makeDateTuple(lat: float, lon: float) -> tuple:
    '''will return current date'''

    currentDate = date.today()
    currentDate = currentDate.timetuple()
    currentDate = currentDate[:3]

    return datetime(int(currentDate[0]), currentDate[1], currentDate[2])

def makeDateTuple(lat: float, lon: float, offset: int) -> tuple:
    '''will return  offset year'''

    currentDate = date.today()
    currentDate = currentDate.timetuple()
    currentDate = currentDate[:3] 



    return datetime(int(currentDate[0]-offset), currentDate[1], currentDate[2])

def staticReturn() -> dict:
    '''to return an information dict through a simple run instead of full call in one line below'''
    #full call would be: createInformationDict(averageWeatherPerDay(weatherAPICall(lat, lon)['dataseries']), lat, lon)
    dataseries = weatherAPICall(lat, lon)

    averages = averageWeatherPerDay(dataseries['dataseries'])

    informationDict = createInformationDict(averages, lat, lon)

    return informationDict

def dynamicReturn(lat: float, lon: float) -> dict:
    '''returning dict using passed in lat and lon'''

    #full call would be: createInformationDict(averageWeatherPerDay(weatherAPICall(lat, lon)['dataseries']), lat, lon)
    dataseries = weatherAPICall(lat, lon)

    averages = averageWeatherPerDay(dataseries['dataseries'])

    informationDict = createInformationDict(averages, lat, lon)

    return informationDict


#testing code
#dataToUse = weatherAPICall(34.92, -82.22)
#print(weatherAPICall(lat,lon))
#print(averageWeatherPerDay(dataToUse['dataseries']))

#below is an example of what is being passed into create info dict
#caseDataSet = {'day1': '23.875', 'day2': '24.125', 'day3': '25.125', 'day4': '24.125', 'day5': '25.875', 'day6': '26.375', 'day7': '27.25', 'day8': '28.125'}
#print(averageWeatherPerDay(caseDataSet))
#createGraph(caseDataSet)
#print(createInformationDict(caseDataSet, lat, lon))

#full working retunr of data with avearge and offset, ***** may want to create a run func to make it easier to read 
#print(createInformationDict(averageWeatherPerDay(weatherAPICall(lat, lon)['dataseries']), lat, lon))
#print(staticReturn())

#testDataSet = {'Day 0': {'currentAverage': '23.5', 'offsetAverage': 24.6}, 'Day 1': {'currentAverage': '23.125', 'offsetAverage': 24.6}, 'Day 2': {'currentAverage': '24.625', 'offsetAverage': 24.6}, 'Day 3': {'currentAverage': '24.125','offsetAverage': 24.6}, 'Day 4': {'currentAverage': '26.25', 'offsetAverage': 24.6}, 'Day 5': {'currentAveragecurrentAverage': '26.25', 'offsetAve': '26.375', 'offsetAverage': 24.6}, 'Day 6': {'currentAverage': '26.75', 'offsetAverage': 24.6}, 'Day 7': {'currentAverage': '28.25', 'offsetAverage': 24.6}}
#print(testDataSet.get('Day 0').get('currentAverage'))

