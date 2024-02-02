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

