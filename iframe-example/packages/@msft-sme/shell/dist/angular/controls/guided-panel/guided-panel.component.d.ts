import { AfterContentInit, QueryList } from '@angular/core';
import { GuidedPaneComponent } from './guided-pane/guided-pane.component';
export declare class GuidedPanelComponent implements AfterContentInit {
    panes: QueryList<GuidedPaneComponent>;
    firstPaneId: string;
    paneHistory: string[];
    private activePane;
    ngAfterContentInit(): void;
    /**
     * Resets the panel to the first pane
     */
    reset(): void;
    /**
     * deactivates the currently active pane
     * @param modifyHistory If true, adds the active pane to history before deactivating it
     */
    private deactivate(modifyHistory);
    /**
     * Find a pane by its id
     * @param id The id of the pane
     */
    private find(id);
    /**
     * Activate a pane by its id
     * @param id The id of the pane
     */
    activate(id: string): void;
    /**
     * navigates back in the pane history
     */
    back(): void;
}
