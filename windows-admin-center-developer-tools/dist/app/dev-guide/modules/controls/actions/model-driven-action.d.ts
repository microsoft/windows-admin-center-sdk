import { Observable } from 'rxjs';
import { ActionButtonAsync, ActionContainer } from '@msft-sme/shell/angular';
export interface MyModel {
    disable1: boolean;
    disable2: boolean;
    hidden3: boolean;
}
export declare class ModelDrivenAction1 extends ActionButtonAsync<MyModel> {
    text: string;
    protected onExecute(target: MyModel): Observable<MyModel>;
    setActionState(target: MyModel, container: ActionContainer): void;
}
export declare class ModelDrivenAction2 extends ActionButtonAsync<MyModel> {
    text: string;
    protected onExecute(target: MyModel): Observable<MyModel>;
    setActionState(target: MyModel, container: ActionContainer): void;
}
export declare class ModelDrivenAction3 extends ActionButtonAsync<MyModel> {
    text: string;
    protected onExecute(target: MyModel): Observable<MyModel>;
    setActionState(target: MyModel, container: ActionContainer): void;
}
export declare class ModelDrivenActionWithError extends ActionButtonAsync<MyModel> {
    text: string;
    protected onExecute(target: MyModel): Observable<MyModel>;
    setActionState(target: MyModel, container: ActionContainer): void;
}
