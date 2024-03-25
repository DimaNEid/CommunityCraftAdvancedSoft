{
	"info": {
		"_postman_id": "2a096e33-240e-47fb-aecb-94bfc37b8a93",
		"name": "Resources",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "32899036"
	},
	"item": [
		{
			"name": "creatResource",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"// Parse the response body for further assertions\r",
							"const response = pm.response.json();\r",
							"\r",
							"// Check that the status code is 201 Created\r",
							"pm.test(\"Resource should be created successfully\", function () {\r",
							"    pm.response.to.have.status(200);\r",
							"});\r",
							"\r",
							"pm.test(\"Response should have the new resource details if returned\", function () {\r",
							"    // Only run this test if the 'newResource' property exists\r",
							"    if (response.newResource) {\r",
							"        pm.expect(response.newResource).to.have.property('MaterialID').that.equals(1130);\r",
							"        pm.expect(response.newResource).to.have.property('MaterialName').that.equals('meter3');\r",
							"        pm.expect(response.newResource).to.have.property('Price').that.equals('25$');\r",
							"        pm.expect(response.newResource).to.have.property('Quantity').that.equals('3');\r",
							"        pm.expect(response.newResource).to.have.property('Available').that.equals('yes');\r",
							"    }\r",
							"});\r",
							"\r",
							"\r",
							""
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"MaterialID\": 1130,\r\n    \"MaterialName\": \"meter3\",\r\n    \"Price\": \"25$\",\r\n    \"Quantity\": \"3\",\r\n    \"Available\": \"yes\"\r\n     \r\n    \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/resources/EnterResource",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						"EnterResource"
					]
				}
			},
			"response": []
		},
		{
			"name": "getResourceByID",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"// Check that the status code is 200 OK\r",
							"pm.test(\"Resource retrieved successfully\", function () {\r",
							"    pm.response.to.have.status(200);\r",
							"});\r",
							"\r",
							"// Parse the response body\r",
							"const response = pm.response.json();\r",
							"\r",
							"\r",
							"// Validate the response contains other expected properties\r",
							"pm.test(\"Response has the expected properties\", function () {\r",
							"    pm.expect(response).to.have.property('MaterialName');\r",
							"    pm.expect(response).to.have.property('Price');\r",
							"    pm.expect(response).to.have.property('Quantity');\r",
							"    pm.expect(response).to.have.property('Available');\r",
							"});\r",
							"\r",
							"// If Available is expected to be yes or no\r",
							"pm.test(\"Available property has a valid value\", function () {\r",
							"    pm.expect(response.Available).to.be.oneOf(['yes', 'no']);\r",
							"});\r",
							""
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/resources/1112",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						"1112"
					]
				}
			},
			"response": []
		},
		{
			"name": "updateResByID",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"pm.test(\"Status code is 200 or 404\", function () {\r",
							"    // This will check if the status code is either 200 (OK) or 404 (Not Found)\r",
							"    pm.expect(pm.response.code).to.be.oneOf([200, 404]);\r",
							"});\r",
							"\r",
							"// If you want to add a custom message for each status code\r",
							"pm.test(\"Response status code is correct\", function () {\r",
							"    if (pm.response.code === 200) {\r",
							"        pm.expect(pm.response.code, \"The resource was found.\").to.equal(200);\r",
							"    } else if (pm.response.code === 404) {\r",
							"        pm.expect(pm.response.code, \"The resource was not found.\").to.equal(404);\r",
							"    }\r",
							"});"
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"resourceId\": \"1113\",\r\n    \"MaterialName\": \"Plastic\",\r\n    \"Price\": 10,\r\n    \"Quantity\": 50,\r\n    \"Available\": true\r\n}\r\n",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/resources/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "deleteResByID",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"pm.test(\"Status code is 200 or 204\", function () {\r",
							"    pm.expect(pm.response.code).to.be.oneOf([200, 204]);\r",
							"});\r",
							"\r",
							"pm.test(\"Successful DELETE request\", function () {\r",
							"    if (pm.response.code === 200) {\r",
							"        var jsonData = pm.response.json();\r",
							"        pm.expect(jsonData.message).to.eql(\"Resource deleted successfully\");\r",
							"    }\r",
							"});\r",
							"\r",
							"//Error handling\r",
							"pm.test(\"Handles non-existent resources correctly\", function () {\r",
							"    if (pm.response.code === 404) {\r",
							"        var jsonData = pm.response.json();\r",
							"        pm.expect(jsonData.error).to.eql(\"Resource not found\");\r",
							"    }\r",
							"});\r",
							"\r",
							"\r",
							""
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/resources/1130",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						"1130"
					]
				}
			},
			"response": []
		},
		{
			"name": "ShowAllRes",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"\r",
							"pm.test(\"Status code is 200 OK\", function () {\r",
							"    pm.response.to.have.status(200);\r",
							"});\r",
							"\r",
							"pm.test(\"Response contains the resource\", function () {\r",
							"    var jsonData = pm.response.json();\r",
							"    pm.expect(jsonData).to.be.an('array');\r",
							"    // Further checks for the first object in the array\r",
							"    pm.expect(jsonData[0]).to.have.property('MaterialID');\r",
							"    pm.expect(jsonData[0]).to.have.property('MaterialName');\r",
							"    // Add further checks as needed\r",
							"});\r",
							"\r",
							"\r",
							""
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/resources/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "ShowResByUser",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"// Parse the response body\r",
							"const responseBody = pm.response.json();\r",
							"\r",
							"// Check if response body is an array\r",
							"pm.test(\"Response body is an array\", function () {\r",
							"    pm.expect(responseBody).to.be.an('array');\r",
							"});\r",
							"\r",
							"// Check if the array is not empty\r",
							"pm.test(\"Response body array is not empty\", function () {\r",
							"    pm.expect(responseBody.length).to.be.above(0);\r",
							"});\r",
							"\r",
							"// Check if every object in the array has the required properties\r",
							"pm.test(\"Every item has required properties\", function () {\r",
							"    responseBody.forEach((item) => {\r",
							"        pm.expect(item).to.have.property('MaterialID');\r",
							"        pm.expect(item).to.have.property('MaterialName');\r",
							"        pm.expect(item).to.have.property('Price');\r",
							"        pm.expect(item).to.have.property('Quantity');\r",
							"        pm.expect(item).to.have.property('Available');\r",
							"    });\r",
							"});\r",
							"\r",
							"// Check if the 'Available' property is either 'yes' or 'no' for the first object\r",
							"pm.test(\"Check if 'Available' is 'yes' or 'no' for the first item\", function () {\r",
							"    pm.expect(responseBody[0].Available).to.be.oneOf(['yes', 'no']);\r",
							"});\r",
							"\r",
							"// Ensure that Quantity is not negative for the first object\r",
							"pm.test(\"Quantity is not negative for the first item\", function () {\r",
							"    pm.expect(responseBody[0].Quantity).to.be.a('number').and.to.be.at.least(0);\r",
							"});\r",
							""
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzExMDc1NjMzLCJleHAiOjE3MTEwNzkyMzN9.qT3bczaXsFOhev1-qCr7uwmQr4eZxOzfoaYJ-rNUwLE",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": " { \"Username\": \"MARKB\",\r\n     \"Password\": \"789\"}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/api/resources/show",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						"show"
					]
				}
			},
			"response": []
		},
		{
			"name": "SearchResUser",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"// Test Case: Verify the status code and content type\r",
							"pm.test(\"Status code is 200 and Content-Type is JSON\", function () {\r",
							"    pm.response.to.have.status(200);\r",
							"    pm.response.to.have.header(\"Content-Type\", \"application/json; charset=utf-8\");\r",
							"});\r",
							"\r",
							"// Test Case: Verify the response body is an array and not empty\r",
							"pm.test(\"Response body is an array and not empty\", function () {\r",
							"    let jsonData = pm.response.json();\r",
							"    pm.expect(jsonData).to.be.an('array');\r",
							"    pm.expect(jsonData.length).to.be.above(0);\r",
							"});\r",
							"\r",
							"// Test Case: Verify that the search returns results that match the name 'plastic'\r",
							"pm.test(\"Search returns materials that match the query parameter value\", function () {\r",
							"    let jsonData = pm.response.json();\r",
							"    jsonData.forEach((item) => {\r",
							"        pm.expect(item.MaterialName.toLowerCase().replace(/\\s+/g, '')).to.include(\"plastic\");\r",
							"    });\r",
							"});\r",
							"\r",
							"// Test Case: Validate the structure of the material objects in the response\r",
							"pm.test(\"Each material object has the correct structure\", function () {\r",
							"    let jsonData = pm.response.json();\r",
							"    jsonData.forEach((item) => {\r",
							"        pm.expect(item).to.have.property('MaterialID');\r",
							"        pm.expect(item).to.have.property('MaterialName');\r",
							"        pm.expect(item).to.have.property('Price');\r",
							"        pm.expect(item).to.have.property('Quantity');\r",
							"        pm.expect(item).to.have.property('Available');\r",
							"        // You can add additional property checks here\r",
							"    });\r",
							"});\r",
							"\r",
							"// Test Case: Verify that the response contains the expected quantity and availability values\r",
							"pm.test(\"Material quantity is a positive number and availability is true\", function () {\r",
							"    let jsonData = pm.response.json();\r",
							"    jsonData.forEach((item) => {\r",
							"        pm.expect(item.Quantity).to.be.a('number');\r",
							"        pm.expect(item.Quantity).to.be.at.least(0); // Correct usage for non-negative numbers\r",
							"        pm.expect(item.Available).to.be.oneOf(['yes', 'true', 1, '1']); // Ensure all possible true values are accounted for as strings or numbers\r",
							"    });\r",
							"});"
						],
						"type": "text/javascript",
						"packages": {}
					}
				}
			],
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzExMDc1NjMzLCJleHAiOjE3MTEwNzkyMzN9.qT3bczaXsFOhev1-qCr7uwmQr4eZxOzfoaYJ-rNUwLE",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/resources/search?name=plastic",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"resources",
						"search"
					],
					"query": [
						{
							"key": "name",
							"value": "plastic"
						}
					]
				}
			},
			"response": []
		}
	]
}