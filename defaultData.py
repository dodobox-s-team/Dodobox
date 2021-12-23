#!/usr/bin/python3
import requests
import json

name = 'quentin'

# Create groups
requests.post(f'https://{name}.dodobox.site/api/groups', data=json.dumps({"id": 0,"name": "Salon"}))
requests.post(f'https://{name}.dodobox.site/api/groups', data=json.dumps({"id": 0,"name": "Cuisine"}))
requests.post(f'https://{name}.dodobox.site/api/groups', data=json.dumps({"id": 0,"name": "Salle de bain"}))

# Create modules for each group
requests.post(f'https://{name}.dodobox.site/api/devices', data=json.dumps({"id": 0,"groupId": 1,"name": "thermomètre","modele": "string","type": 1,"ip": "192.168.1.99","toggle": True}))
requests.post(f'https://{name}.dodobox.site/api/devices', data=json.dumps({"id": 0,"groupId": 1,"name": "humidité","modele": "string","type": 2,"ip": "192.168.1.99","toggle": True}))
requests.post(f'https://{name}.dodobox.site/api//devices', data=json.dumps({"id": 0,"groupId": 1,"name": "qualité de l\'air","modele": "string","type": 3,"ip": "192.168.1.99","toggle": True}))

requests.post(f'https://{name}.dodobox.site/api/devices', data=json.dumps({"id": 0,"groupId": 2,"name": "qualité de l\'air","modele": "string","type": 3,"ip": "192.168.1.95","toggle": True}))

requests.post(f'https://{name}.dodobox.site/api/devices', data=json.dumps({"id": 0,"groupId": 3,"name": "thermomètre","modele": "string","type": 1,"ip": "192.168.1.124","toggle": True}))
requests.post(f'https://{name}.dodobox.site/api/devices', data=json.dumps({"id": 0,"groupId": 3,"name": "humidité","modele": "string","type": 2,"ip": "192.168.1.124","toggle": True}))

# Create graph
requests.post(f'https://{name}.dodobox.site/api/graph', data=json.dumps({"id": 0,"deviceId": 1,"name": "thermoSalon","axisLabel": "°C"}))
requests.post(f'https://{name}.dodobox.site/api/graph', data=json.dumps({"id": 0,"deviceId": 2,"name": "humiSalon","axisLabel": "°C"}))
requests.post(f'https://{name}.dodobox.site/api/graph', data=json.dumps({"id": 0,"deviceId": 3,"name": "qualiSalon","axisLabel": "q"}))
requests.post(f'https://{name}.dodobox.site/api/graph', data=json.dumps({"id": 0,"deviceId": 4,"name": "qualiCuisine","axisLabel": "q"}))
requests.post(f'https://{name}.dodobox.site/api/graph', data=json.dumps({"id": 0,"deviceId": 5,"name": "thermoSDB","axisLabel": "°C"}))
requests.post(f'https://{name}.dodobox.site/api/graph', data=json.dumps({"id": 0,"deviceId": 6,"name": "humiSDB","axisLabel": "%"}))
