import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-connection-manager',
    templateUrl: './secure-extension-data.component.html'
})
export class SecureExtensionDataComponent {
public storeCode = `
\`\`\` ts
const key = 'Test key';
const data = 'Test data';
this.secureExtensionDataService.createSecureExtensionToken(key, 'Test data').subscribe();
\`\`\`
`;

public retrieveCode = `
\`\`\` ts
const request: AjaxRequest = { headers: {} };
// request is an optional parameter if you have an existing request object.
this.secureExtensionDataService.addSecureExtensionDataHeader(key, request).subscribe(
    (newRequest: AjaxRequest) => {
        request = newRequest;
    }
);

// call the plugin's endpoint
const callUrl = this.appContextService.activeConnection.nodeName;
this.appContextService.node.get(callUrl, 'features/Plugin%20Name', request).subscribe(
    (response) => {
        console.log('Success!');
    }
);
\`\`\`
`;

public pluginCode = `
\`\`\` c#
protected override async Task<HttpResponseMessage> Process(PlugInUrl url, HttpRequestMessage request, CancellationToken cancellationToken)
{
    // Decrypts data into a SecureString.
    var data = this.GetSecureExtensionData(request);

    // Optionally cast the SecureString in to a plain text string.
    var plainText = this.GetSecureExtensionData(request).ToPlainText();

    // Interact with the decrypted data however it is needed.
    return new HttpResponseMessage()
    {
        StatusCode = HttpStatusCode.OK,
        Content = new StringContent($"{{\"message\":\"Success!'\"}}", Encoding.UTF8, "application/json"),
    };
}
\`\`\`
`;

}
