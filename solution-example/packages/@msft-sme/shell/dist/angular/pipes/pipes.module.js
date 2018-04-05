import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BooleanConverterPipe } from './boolean-converter.pipe';
import { ByteUnitConverterPipe } from './byte-unit-converter.pipe';
import { EnumConverterPipe } from './enum-converter.pipe';
import { FilterPipe } from './filter.pipe';
import { FormatPipe } from './format.pipe';
import { HighlightPipe } from './highlight.pipe';
var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
export { PipesModule };
PipesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BooleanConverterPipe,
                    ByteUnitConverterPipe,
                    EnumConverterPipe,
                    FilterPipe,
                    FormatPipe,
                    HighlightPipe
                ],
                imports: [CommonModule],
                exports: [
                    BooleanConverterPipe,
                    ByteUnitConverterPipe,
                    EnumConverterPipe,
                    FilterPipe,
                    FormatPipe,
                    HighlightPipe
                ]
            },] },
];
/** @nocollapse */
PipesModule.ctorParameters = function () { return []; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuZ3VsYXIvcGlwZXMvcGlwZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFBLEVBQWEsTUFBTyxpQkFBQSxDQUFrQjtBQUMvQyxPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUV6QyxPQUFPLEVBQUUsb0JBQUEsRUFBcUIsTUFBTywwQkFBQSxDQUEyQjtBQUNoRSxPQUFPLEVBQUUscUJBQUEsRUFBc0IsTUFBTyw0QkFBQSxDQUE2QjtBQUNuRSxPQUFPLEVBQUUsaUJBQUEsRUFBa0IsTUFBTyx1QkFBQSxDQUF3QjtBQUMxRCxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsVUFBQSxFQUFXLE1BQU8sZUFBQSxDQUFnQjtBQUMzQyxPQUFPLEVBQUUsYUFBQSxFQUFjLE1BQU8sa0JBQUEsQ0FBbUI7QUFHakQ7SUFBQTtJQXdCQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQXhCQSxBQXdCQzs7QUF4QmlDLHNCQUFVLEdBQTBCO0lBQ3RFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNaLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixpQkFBaUI7b0JBQ2pCLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixhQUFhO2lCQUNkO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixpQkFBaUI7b0JBQ2pCLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixhQUFhO2lCQUNkO2FBQ0YsRUFBRyxFQUFFO0NBQ0wsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLDBCQUFjLEdBQW1FLGNBQU0sT0FBQSxFQUM3RixFQUQ2RixDQUM3RixDQUFDIiwiZmlsZSI6InBpcGVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9CQS8xMzEvcy9pbmxpbmVTcmMvIn0=