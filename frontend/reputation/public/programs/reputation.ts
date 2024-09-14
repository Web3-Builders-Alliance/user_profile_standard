export type Reputation = {
  "version": "0.1.0",
  "name": "reputation",
  "instructions": [
    {
      "name": "initializeReputationDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeSourceDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteReputationDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deleteSourceDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "createSourceAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteSourceAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTokenBackedReputationAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dateString",
          "type": "string"
        }
      ]
    },
    {
      "name": "createNonTokenBackedReputationAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dateString",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeReputationAttachedAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deleteReputationAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addReputation",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        },
        {
          "name": "bonus",
          "type": "u8"
        }
      ]
    },
    {
      "name": "subtractReputation",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        },
        {
          "name": "penalty",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "reputationData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reputationAccountsTally",
            "type": "u64"
          },
          {
            "name": "sourcesTally",
            "type": "u64"
          },
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "slotTimeCreated",
            "type": "u64"
          },
          {
            "name": "logs",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "reputation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sourcesCount",
            "type": "u64"
          },
          {
            "name": "attachedAccount",
            "type": "publicKey"
          },
          {
            "name": "dateCreated",
            "type": "string"
          },
          {
            "name": "slotTimeCreated",
            "type": "u64"
          },
          {
            "name": "tokenBacked",
            "type": "bool"
          },
          {
            "name": "securityLevel",
            "type": {
              "defined": "Level"
            }
          },
          {
            "name": "logs",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "sourceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sourceName",
            "type": "string"
          },
          {
            "name": "sourceAuthority",
            "type": "publicKey"
          },
          {
            "name": "sourceCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "source",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "reputation",
            "type": "publicKey"
          },
          {
            "name": "points",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "logs",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Level",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "High"
          },
          {
            "name": "Medium"
          },
          {
            "name": "Low"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "SumLimmit"
    },
    {
      "code": 6001,
      "name": "SubtrationLimmit"
    }
  ]
};

export const IDL: Reputation = {
  "version": "0.1.0",
  "name": "reputation",
  "instructions": [
    {
      "name": "initializeReputationDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeSourceDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteReputationDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deleteSourceDataAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sourceData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "createSourceAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteSourceAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTokenBackedReputationAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dateString",
          "type": "string"
        }
      ]
    },
    {
      "name": "createNonTokenBackedReputationAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "dateString",
          "type": "string"
        }
      ]
    },
    {
      "name": "changeReputationAttachedAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deleteReputationAccount",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addReputation",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        },
        {
          "name": "bonus",
          "type": "u8"
        }
      ]
    },
    {
      "name": "subtractReputation",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "reputation",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "source",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sourceName",
          "type": "string"
        },
        {
          "name": "penalty",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "reputationData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reputationAccountsTally",
            "type": "u64"
          },
          {
            "name": "sourcesTally",
            "type": "u64"
          },
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "slotTimeCreated",
            "type": "u64"
          },
          {
            "name": "logs",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "reputation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sourcesCount",
            "type": "u64"
          },
          {
            "name": "attachedAccount",
            "type": "publicKey"
          },
          {
            "name": "dateCreated",
            "type": "string"
          },
          {
            "name": "slotTimeCreated",
            "type": "u64"
          },
          {
            "name": "tokenBacked",
            "type": "bool"
          },
          {
            "name": "securityLevel",
            "type": {
              "defined": "Level"
            }
          },
          {
            "name": "logs",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    },
    {
      "name": "sourceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sourceName",
            "type": "string"
          },
          {
            "name": "sourceAuthority",
            "type": "publicKey"
          },
          {
            "name": "sourceCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "source",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "reputation",
            "type": "publicKey"
          },
          {
            "name": "points",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "logs",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Level",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "High"
          },
          {
            "name": "Medium"
          },
          {
            "name": "Low"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "SumLimmit"
    },
    {
      "code": 6001,
      "name": "SubtrationLimmit"
    }
  ]
};
