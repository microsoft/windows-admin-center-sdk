import { Dropdown } from './models';
export declare class DropdownService {
    private onDocumentClickBinding;
    private onDocumentKeydownBinding;
    private onWindowBlurBinding;
    private activeDropdown;
    /**
     * opens a dropdown and sets it to active
     * @param dropdown The dropdown to open
     */
    open(dropdown: Dropdown): void;
    /**
     * Marks a dropdown as closed, if the dropdown is the active dropdown,
     * the active dropdown is reset and event handlers are removed.
     * @param dropdown The dropdown to close
     */
    close(dropdown: Dropdown): void;
    /**
     * Handles document clicks while a dropdown is open
     * @param event
     */
    private onDocumentClick(event);
    /**
     * Handles document keydowns while a dropdown is open
     * @param event
     */
    private onDocumentKeydown(event);
    /**
     * Handles window blurs while a dropdown is open
     * @param event
     */
    private onWindowBlur(event);
}
