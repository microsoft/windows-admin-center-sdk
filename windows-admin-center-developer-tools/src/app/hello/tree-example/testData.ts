// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { TreeNodeDataItem } from '@microsoft/windows-admin-center-sdk/angular';

/* tslint:disable */
export var TestData = <TreeNodeDataItem>{
  data: {
    label: 'API Examples',
    type: 'folder',
    expanded: true,
    data: 'WMI',
    isLeaf: false
  },
  children: [
    {
      data: {
        label: 'WMI',
        type: '',
        expanded: true,
        data: 'WMI',
        isLeaf: true
      }
    },
    {
      data: {
        label: 'PowerShell',
        type: '',
        expanded: true,
        data: 'PowerShell',
        isLeaf: true
      }
    },
    {
      data: {
        label: 'Tree View Code',
        type: '',
        expanded: true,
        data: 'TreeCode',
        isLeaf: true
      }
    },
    {
      data: {
        label: 'User Profile',
        type: '',
        expanded: true,
        data: 'UserProfile',
        isLeaf: true
      }
    }
  ]
};