export const CONTRACT_ADDRESS_PATIENT = "0x6725a8f9e2c16eb0de47dbc4e46d6828dc5a9cc5"
export const ABI_PATIENT = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "address1",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateOfBirth",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isMale",
				"type": "bool"
			}
		],
		"name": "addPerson",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "address1",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "publicAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dateOfBirth",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isMale",
				"type": "bool"
			}
		],
		"name": "newPerson",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllPersons",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "address1",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "publicAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "dateOfBirth",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isMale",
						"type": "bool"
					}
				],
				"internalType": "struct User.Person[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const CONTRACT_ADDRESS_DOCTOR = "0xe0aec837b64e4e070a907d512b4d85169e482503"
export const ABI_DOCTOR = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialty",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "charge",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "publicAddress",
				"type": "string"
			}
		],
		"name": "addDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "specialty",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "charge",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "publicAddress",
				"type": "string"
			}
		],
		"name": "newDoctor",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllDoctors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "specialty",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "charge",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "publicAddress",
						"type": "string"
					}
				],
				"internalType": "struct User.Doctor[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const CONTRACT_ADDRESS_APPOINTMENT = "0x646e0520dca9a7be1a3ec586984bb3d60641f4cc"
export const ABI_APPOINTMENT = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "patientAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "doctorAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dateOfBooking",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "timeOfBooking",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isPaid",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "charge",
				"type": "uint256"
			}
		],
		"name": "newAppointment",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "patientAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateOfBooking",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "timeOfBooking",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "charge",
				"type": "uint256"
			}
		],
		"name": "addAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "doPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAppointment",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "patientName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "patientAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctorAddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dateOfBooking",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "timeOfBooking",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isPaid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "charge",
						"type": "uint256"
					}
				],
				"internalType": "struct AppointmentContract.Appointment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const CONTRACT_ADDRESS_DISEASE = "0x04418df06c9c9520fe4332604ffc496877a915c6"
export const ABI_DISEASE = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "diseaseName",
				"type": "string"
			}
		],
		"name": "addDisease",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "diseaseName",
				"type": "string"
			}
		],
		"name": "addTimestamp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "diseaseName",
				"type": "string"
			}
		],
		"name": "getAllTimestampForDisease",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "timestamps",
						"type": "uint256[]"
					}
				],
				"internalType": "struct DiseaseContract.Data[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "diseaseName",
				"type": "string"
			}
		],
		"name": "getDiseasePatients",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]