import { Component } from '@angular/core';
var SpacingComponent = /** @class */ (function () {
    function SpacingComponent() {
        this.spaceScale = [
            'none',
            'xxxs',
            'xxs',
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
            'xxl',
            'xxxl'
        ];
        this.borderScale = [
            'none',
            'sm',
            'md',
            'lg'
        ];
        this.spaceTypes = [
            'inset',
            'top',
            'left',
            'bottom',
            'right',
            'vertical',
            'horizontal',
            'squish-v',
            'squish-h',
            'spread-v',
            'spread-h'
        ];
    }
    SpacingComponent.navigationTitle = function (appContextService, snapshot) {
        return 'Spacing';
    };
    SpacingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sme-ng2-spacing',
                    template: "\n      <div class=\"sme-layout-absolute sme-position-inset-none sme-documentation\">\n        <h1>Spacing</h1>\n        <section>\n          <p>The sme spacing scale and associated classes use a base pixel size to derive common values used for defining space.</p>\n          <p>\n            <b>'Space'</b>\n            <span>is the term we use to define the dimensions of objects and the distance inbetween them</span>\n          </p>\n\n          <p>Most if not all scenarios can be achieved using the predefined spacing guidlines. Please do not to create your own spacing\n            and stick to this spacing scale. This will help the product to maintain a sense of cohesion and consistency even though\n            it is developed by many different teams and organizations</p>\n\n        </section>\n\n        <h2>Spacing Scales</h2>\n        <section>\n          <h3>General Scale</h3>\n          <div class=\"sme-arrange-wrapstack-h\">\n            <div *ngFor=\"let size of spaceScale\" class=\"sme-arrange-stack-v sme-margin-inset-xs\">\n              <div class=\"sme-position-center-h-inline sme-font-label\">{{size}}</div>\n              <div [ngClass]=\"['sme-background-color-accent sme-height-xxxl sme-position-center-h-block', 'sme-width-'+ size]\"></div>\n            </div>\n          </div>\n\n          <h3>Border Scale</h3>\n          <div class=\"sme-arrange-wrapstack-h\">\n            <div *ngFor=\"let size of borderScale\" class=\"sme-arrange-stack-v sme-font-label\">\n              <div class=\"sme-position-center-h-inline\">{{size}}</div>\n              <div [ngClass]=\"['sme-border-color-accent sme-margin-inset-xs sme-height-xxxl sme-width-xxxl', 'sme-border-inset-'+ size]\"></div>\n            </div>\n          </div>\n        </section>\n\n        <h2>Spacing Types</h2>\n        <section>\n          <p>The following examples all use the 'sm' spacing scale size.</p>\n          <div class=\"sme-arrange-wrapstack-h\">\n            <div *ngFor=\"let type of spaceTypes\" class=\"sme-arrange-stack-v sme-font-label\">\n              <div class=\"sme-position-center-h-inline\">{{type}}</div>\n              <div class=\"sme-layout-relative sme-background-color-accent sme-margin-inset-sm sme-border-inset-sm sme-square-xxxl\">\n                <div [ngClass]=\"['sme-layout-absolute sme-background-color-white sme-position-inset-none', 'sme-position-'+ type + '-sm']\"></div>\n              </div>\n            </div>\n          </div>\n          <table>\n            <thead>\n              <tr>\n                <th>Spacing Type Name</th>\n                <th>Effect</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td>inset</td>\n                <td>Applies space to all sides of the object</td>\n              </tr>\n              <tr>\n                <td>top</td>\n                <td>Applies space to the top side of the object</td>\n              </tr>\n              <tr>\n                <td>left</td>\n                <td>Applies space to the left side of the object</td>\n              </tr>\n              <tr>\n                <td>bottom</td>\n                <td>Applies space to the bottom side of the object</td>\n              </tr>\n              <tr>\n                <td>right</td>\n                <td>Applies space to the right side of the object</td>\n              </tr>\n              <tr>\n                <td>vertical</td>\n                <td>Applies space to the top and bottom sides of the object</td>\n              </tr>\n              <tr>\n                <td>horizontal</td>\n                <td>Applies space to the left and right sides of the object</td>\n              </tr>\n              <tr>\n                <td>squish-v</td>\n                <td>Applies space to the left and right sides of the object and 50% space to the top and bottom</td>\n              </tr>\n              <tr>\n                <td>squish-h</td>\n                <td>Applies space to the top and bottom sides of the object and 50% space to the left and right</td>\n              </tr>\n              <tr>\n                <td>spread-v</td>\n                <td>Applies space to the left and right sides of the object and 150% space to the top and bottom</td>\n              </tr>\n              <tr>\n                <td>spread-h</td>\n                <td>Applies space to the top and bottom sides of the object and 150% space to the left and right</td>\n              </tr>\n            </tbody>\n          </table>\n        </section>\n\n        <h2>Spacing Classes</h2>\n        <section>\n          <h3>Class Prefixes</h3>\n            <p>All Classes are prefixed with 'sme-'. Spatial classes are additionally prefixed based on the properties that they effect</p>\n            <table>\n              <thead>\n                <tr>\n                  <th>Spacing Class Prefix</th>\n                  <th>Effect</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>position</td>\n                  <td>Modifies the top, left, bottom, and right properties</td>\n                </tr>\n                <tr>\n                  <td>margin</td>\n                  <td>Modifies the margin property</td>\n                </tr>\n                <tr>\n                  <td>padding</td>\n                  <td>Modifies the padding property</td>\n                </tr>\n                <tr>\n                  <td>border</td>\n                  <td>Modifies the border-width property</td>\n                </tr>\n                <tr>\n                  <td>height</td>\n                  <td>Modifies the height property</td>\n                </tr>\n                <tr>\n                  <td>width</td>\n                  <td>Modifies the width property</td>\n                </tr>\n                <tr>\n                  <td>square</td>\n                  <td>Modifies the height, and width properties equally</td>\n                </tr>\n                <tr>\n                  <td>line-height</td>\n                  <td>Modifies the line-height property</td>\n                </tr>\n              </tbody>\n            </table>\n\n            <h3>Class Format</h3>\n            <p>The final spacing clases take the following format</p>\n            <code>.sme-[spacing prefix]-[spacing type]-[spacing size]</code>\n            <p>Here are some examples of valid classes:</p>\n            <code>.sme-margin-inset-sm</code>\n            <code>.sme-border-left-lg</code>\n            <code>.sme-position-squish-v-xxl</code>\n        </section>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    SpacingComponent.ctorParameters = function () { return []; };
    return SpacingComponent;
}());
export { SpacingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3BhY2luZy9zcGFjaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFVLE1BQU8sZUFBQSxDQUFnQjtBQUsxQztJQUFBO1FBRVcsZUFBVSxHQUFHO1lBQ2hCLE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLElBQUk7WUFDSixJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUk7WUFDSixJQUFJO1lBQ0osS0FBSztZQUNMLE1BQU07U0FDVCxDQUFDO1FBRUssZ0JBQVcsR0FBRztZQUNqQixNQUFNO1lBQ04sSUFBSTtZQUNKLElBQUk7WUFDSixJQUFJO1NBQ1AsQ0FBQztRQUVLLGVBQVUsR0FBRztZQUNoQixPQUFPO1lBQ1AsS0FBSztZQUNMLE1BQU07WUFDTixRQUFRO1lBQ1IsT0FBTztZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtTQUNiLENBQUM7SUE0S04sQ0FBQztJQTFLaUIsZ0NBQWUsR0FBN0IsVUFBOEIsaUJBQW9DLEVBQUUsUUFBZ0M7UUFDaEcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0UsMkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN0QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsKytNQThKVDtpQkFDSixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBbUUsY0FBTSxPQUFBLEVBQzdGLEVBRDZGLENBQzdGLENBQUM7SUFDRix1QkFBQztDQTlNRCxBQThNQyxJQUFBO1NBOU1ZLGdCQUFnQiIsImZpbGUiOiJzcGFjaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS80NDQvcy9pbmxpbmVTcmMvIn0=