import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-ng2-control-input-code-editor-example',
    templateUrl: './code-editor-example.component.html'
})
@NavigationTitle({
    getTitle: () => 'Code Editor'
})
export class CodeEditorExampleComponent {
    public powershell = `<#
    .SYNOPSIS
    sleeps for 10 seconds then returns a psObject

    .DESCRIPTION
    sleeps for 10 seconds then returns a psObject

    #>

    Set-StrictMode -Version 5.0

    Start-Sleep 10

    $result = New-Object PSObject

    Add-Member -InputObject $result -MemberType NoteProperty -Name "Name" -Value "TEST"

    $result
    `;
    public html = `<div class="sme-layout-absolute sme-position-inset-none sme-documentation">
  <h2>Code Editor</h2>
  <div class="sme-documentation-example sme-margin-bottom-xxl">
    <form #formCtrl="ngForm">

      <sme-form-field type="code" name="powershell" orientation="vertical" [(ngModel)]="powershell"
                      label="PowerShell Code (vertical orientation)" language="powershell">
      </sme-form-field>
      <sme-form-field type="code" name="html" [(ngModel)]="html" label="HTML Code" language="html">
      </sme-form-field>
      <sme-form-field type="code" name="typescript" [(ngModel)]="typescript" label="TypeScript Code" language="typescript">
      </sme-form-field>
      <sme-form-field type="code" name="css" orientation="vertical" [(ngModel)]="css" label="CSS Code (vertical orientation)"
                      language="css">
      </sme-form-field>
      <sme-form-field type="code" name="markdown" orientation="vertical" [(ngModel)]="markdown" label="Markdown Code (vertical orientation)"
                      language="markdown">
      </sme-form-field>
    </form>
  </div>
</div>`;
    public typescript = `import { Component } from '@angular/core';

@Component({
    selector: 'sme-example-component',
    templateUrl: './example.component.html'
})
export class ExampleComponent {}
`;
    public css = `.sme-code-editor {
    border-top-width: 1px;
    border-top-style: solid;
    border-left-width: 1px;
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-right-width: 1px;
    border-right-style: solid;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    min-height: 200px;
    overflow: hidden;
    position: absolute
}

.sme-theme-light .sme-code-editor,
.sme-theme-dark .sme-theme-light .sme-code-editor {
    border-color: #b3b3b3
}

.sme-theme-dark .sme-code-editor,
.sme-theme-light .sme-theme-dark .sme-code-editor {
    border-color: #4d4d4d
}

sme-form-field[type="code"] {
    position: relative;
    max-width: unset;
    min-height: 236px
}

sme-form-field[type="code"] label+.sme-code-editor {
    top: 36px
}

sme-form-field[type="code"].sme-form-field-orientation-horizontal {
    min-height: 200px
}

sme-form-field[type="code"].sme-form-field-orientation-horizontal .sme-code-editor {
    top: 0;
    left: 248px
}`;
    public markdown = `# Header 1

## Header 2

This is a paragraph of text content that keeps going on and on and on

## Header 2

This is a paragraph of text content that keeps going on and on and on that also has [links](http://www.bing.com)

## Header 2

in addition to links, you can also have **bold** and *italic* text.

code should work too:
\`\`\` typescript
    var variable = 'assignment';
    if (itShouldBeDone) {
        this.doIt()
    } else {
        throw new Error('It shouldnt have been tried.')
    }
\`\`\`
`;
}
