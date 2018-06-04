# Dynamic display of tools in the Tools menu #

While building extensions and tools, there might be situations in which you will want to have your tool hidden from the available tools list.  For instance if you were building a feature that targeted Windows Server 2016 only, but the user connects to a Windows 2012 R2 server, it might be a better user experience to not display the tool rather than have the user click on it, and then wait for the tool to load, only to have a message that it's features are not available for their connection.  All configuration will be done in the tool's manifest.json file.

## Options for deciding when to show a tool ##

There are 3 different options you can use to determine whether your tool should be displayed and available for a specific server or cluster connection.

* localhost
* inventory (an array of properties)
* script

### LocalHost ###

The localHost property of the Conditions object contains a boolean value that can be evaluated to infer if the connecting node is localHost (the same computer that Honolulu is installed on) or not.  By passing a value to the property, you indicate the condition in which you want the tool to display.  For example if you only wanted the tool to display if the user is in fact connecting to the local host, you will set it up like this:

``` json
"conditions": [
{
    "localhost": true
}]
```
Alternatively, if you only want your tool to display when the connecting node *is not* localhost:
``` json
"conditions": [
{
    "localhost": false
}]
```

A full example of a configuration for only showing a tool when the connecting node is not localhost would look like this:

``` json
"entryPoints": [
{
    "entryPointType": "tool",
    "name": "main",
    "urlName": "processes",
    "displayName": "resources:strings:displayName",
    "description": "resources:strings:description",
    "icon": "sme-icon:icon-win-serverProcesses",
    "path": "",
    "requirements": [
    {
        "solutionIds": [
        "msft.sme.server-manager!windowsClients"
        ],
        "connectionTypes": [
        "msft.sme.connection-type.windows-client"
        ],
        "conditions": [
        {
            "localhost": true
        }
        ]
    }
    ]
}
```

### Inventory Properties ###
A pre-curated set of inventory properties are provided, which you can use to build conditions for determining whether your tool should be available or not. The 9 different properties in the 'inventory' array are:

| Property Name | Expected Value Type |
| ------------- | ------------------- |
| computerManufacturer | string |
| operatingSystemSKU | number |
| operatingSystemVersion | version_string (eg: "10.1.*") |
| productType | number |
| clusterFqdn | string |
| isHyperVRoleInstalled | boolean |
| isHyperVPowershellInstalled | boolean |
| isManagementToolsAvailable | boolean |
| isWmfInstalled | boolean |
| isRemoteAppEnabled | boolean |

Every object in the inventory array must conform to the following json structure:

``` json
"<property name>": {
    "type": "<expected type>",
    "operator": "<defined operator to use>",
    "value": "<expected value to evaulate using the operator>"
}
```

#### Operator Values ####

| Operator | Description | Supported Types |
| -------- | ----------- | --------------- |
| gt | greater than | number, string (case-insensitive), version |
| ge | greater than or equal to | number, string (case-insensitive), version |
| lt | less than | number, string (case-insensitive), version |
| le | less than or equal to | number, string (case-insensitive), version |
| eq | equal to | number, string (case-insensitive), version (accepts '\*' as in "1.2.\*") |
| ne | not equal to | number, string (case-insensitive), version (accepts '\*' as in "1.2.\*") |
| is | checking if a value is true | number, string, boolean |
| not | checking if a value is false | number, string, boolean |
| contains | item exists in a string | string (case-insensitive) |
| notContains | item does not exist in a string | string (case-insensitive) |
| anyEq | any one of values equal | numberArray, stringArray |
| anyNe | any one of values not equal | numberArray, stringArray |
| anyContains | any one of string contains | stringArray |
| anyNotContains | any one of string not contains | stringArray |

#### Data Types ####

Available options for the *"type"* property:

| type | description |
| ---- | ----------- |
| version | a version number (eg: 10.1.*) |
| number | a numeric value |
| string | a string value |
| boolean | true or false |
| numberArray | an array of numbers (eg: [5, 10, 15]) |
| stringArray | an array of strings (eg: []) |

#### Value Types ####

Available types that the *"value"* property accepts:

* string
* number
* boolean
* array of strings
* array of numbers

A properly formed inventory condition set would look like this:

``` json
"entryPoints": [
{
    "entryPointType": "tool",
    "name": "main",
    "urlName": "processes",
    "displayName": "resources:strings:displayName",
    "description": "resources:strings:description",
    "icon": "sme-icon:icon-win-serverProcesses",
    "path": "",
    "requirements": [
    {
        "solutionIds": [
        "msft.sme.server-manager!servers"
        ],
        "connectionTypes": [
        "msft.sme.connection-type.server"
        ],
        "conditions": [
        {
            "inventory": {
            "operatingSystemVersion": {
                "type": "version",
                "operator": "gt",
                "value": "6.3"
            },
            "operatingSystemSKU": {
                "type": "number",
                "operator": "eq",
                "value": "8"
            }
            }
        }
        ]
    }
    ]
}
```

### Script ###

And finally you are able to execute a custom PowerShell script to identify the availability and state of the node.  All scripts must return an object with the following structure:

``` ps
@{
    State = ‘Available’ | 'NotSupported’ | ‘NotConfigured';
    Message = '<Message to explain the reason of state such as not supported and not configured.>';
    Properties =
        @{ Name = 'Prop1'; Value = 'prop1 data'; Type = 'string' },
        @{Name='Prop2'; Value = 12345678; Type='number'; };
}
```
NOTE: All 3 properties ('State', 'Message' and 'Properties') are required in your return object:
* 'State' should always return one of the 3 available values ('Available', 'NotSupported' and 'NotConfigured')
* 'Message' may be an empty string but should return an explanation for 'NotSupported' & 'NotConfigured' states
* 'Properties' should contain an empty object if we don't plan on using it (eg. @{ })

For example, if we only wanted a tool to load if the remote server had bitlocker installed, we could use a script like this:

``` ps
$response = @{
    State = 'NotConfigured';
    Message = 'Not executed';
    Properties = @{ Name = 'Prop1'; Value = 'prop1 data'; Type = 'string' },
        @{Name='Prop2'; Value = 12345678; Type='number'; };
}

if (Get-Module -ListAvailable -Name servermanager) {
    Import-module servermanager; 
    $isInstalled = (Get-WindowsFeature -name bitlocker).Installed;
    $isGood = $isInstalled;
}

if($isGood) {
    $response.State = 'Available';
    $response.Message = 'Everything should work.';
}

$response
```

An entry point configuration using the script option will look like this:

``` json
"entryPoints": [
{
    "entryPointType": "tool",
    "name": "main",
    "urlName": "processes",
    "displayName": "resources:strings:displayName",
    "description": "resources:strings:description",
    "icon": "sme-icon:icon-win-serverProcesses",
    "path": "",
    "requirements": [
    {
        "solutionIds": [
        "msft.sme.server-manager!windowsClients"
        ],
        "connectionTypes": [
        "msft.sme.connection-type.windows-client"
        ],
        "conditions": [
        {
            "localhost": true,
            "inventory": {
            "operatingSystemVersion": {
                "type": "version",
                "operator": "eq",
                "value": "10.0.*"
            },
            "operatingSystemSKU": {
                "type": "number",
                "operator": "eq",
                "value": "4"
            }
            },
            "script": "$response = @{ State = 'NotConfigured'; Message = 'Not executed'; Properties = @{ Name = 'Prop1'; Value = 'prop1 data'; Type = 'string' }, @{Name='Prop2'; Value = 12345678; Type='number'; }; } if (Get-Module -ListAvailable -Name servermanager) { Import-module servermanager; $isInstalled = (Get-WindowsFeature -name bitlocker).Installed; $isGood = $isInstalled; } if($isGood) { $response.State = 'Available'; $response.Message = 'Everything should work.'; } $response"
        }
        ]
    }
    ]
}
```

NOTE: The 'script' example above includes a script that has converted to a string and condensed to a single line for portability. Keep in mind that quotes and backslashes need to be escaped.

## Supporting multiple requirement sets ##

It is possible to support more than one set of requirements, by defining multiple "requirements" blocks.

For example, if you would like to display your tool if "scenario A" OR "scenario B" were true, you can define two requirements blocks, and if either is true (that is, all conditions within a requirements block are met), the tool will be displayed.

``` json
"entryPoints": [
{
    "requirements": [
    {
        "solutionIds": [
            …"scenario A"…
        ],
        "connectionTypes": [
            …"scenario A"…
        ],
        "conditions": [
            …"scenario A"…
        ]
    },
    {
        "solutionIds": [
            …"scenario B"…
        ],
        "connectionTypes": [
            …"scenario B"…
        ],
        "conditions": [
            …"scenario B"…
        ]
    }
    ]
}

```


## Supporting condition ranges ##

It is possible to support a range of conditions, by defining multiple "conditions" blocks with the same property, but with different operators.

When the same property is defined with different operators, the tool will be displayed as long as the value is between the two conditions.

Here is an example of two conditions blocks defining a range of operating system versions that are supported (between 6.3.0 and 10.0.0).

``` json
"entryPoints": [
{
    "entryPointType": "tool",
    "name": "main",
    "urlName": "processes",
    "displayName": "resources:strings:displayName",
    "description": "resources:strings:description",
    "icon": "sme-icon:icon-win-serverProcesses",
    "path": "",
    "requirements": [
    {
        "solutionIds": [
             "msft.sme.server-manager!servers"
        ],
        "connectionTypes": [
             "msft.sme.connection-type.server"
        ],
        "conditions": [
        {
            "inventory": {
                "operatingSystemVersion": {
                    "type": "version",
                    "operator": "gt",
                    "value": "6.3.0"
                },
            }
        },
        {
            "inventory": {
                "operatingSystemVersion": {
                    "type": "version",
                    "operator": "lt",
                    "value": "10.0.0"
                }
            }
        }
        ]
    }
    ]
}

```
