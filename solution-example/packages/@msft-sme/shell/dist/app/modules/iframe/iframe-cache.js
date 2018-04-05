import { NativeQ } from '../../../core';
export var FrameDataEventType;
(function (FrameDataEventType) {
    FrameDataEventType[FrameDataEventType["AddOnly"] = 0] = "AddOnly";
    FrameDataEventType[FrameDataEventType["PushedOut"] = 1] = "PushedOut";
    FrameDataEventType[FrameDataEventType["Swap"] = 2] = "Swap";
    FrameDataEventType[FrameDataEventType["Noop"] = 3] = "Noop";
})(FrameDataEventType || (FrameDataEventType = {}));
/**
 * The global frames service.
 */
var IFrameCache = (function () {
    function IFrameCache() {
        this.collection = [];
    }
    /**
     * Initializes set of cached frames.
     *
     * @param setId the id of frame set.
     * @param count the count of frames in the set.
     * @param primary the primary outlet to connect header breadcrumb bar.
     * @param routerHandlers the router handlers.
     */
    IFrameCache.prototype.init = function (setId, count, primary, routerHandlers) {
        if (this.collection[setId]) {
            throw new Error('Set-{0} frames has been initialized already.'.format(setId));
        }
        var frameDataCollection = [];
        for (var id = 0; id < count; id++) {
            frameDataCollection[id] = null;
        }
        var activeIndex = null;
        this.setSetData(setId, { count: count, frameDataCollection: frameDataCollection, activeIndex: activeIndex, primary: primary, routerHandlers: routerHandlers });
    };
    /**
     * Gets the frame set data.
     *
     * @param setId the set id number.
     */
    IFrameCache.prototype.getSetData = function (setId) {
        return this.collection[setId];
    };
    /**
     * Sets the frame set data.
     *
     * @param setId the set id number.
     * @param setData the set data.
     */
    IFrameCache.prototype.setSetData = function (setId, setData) {
        this.collection[setId] = setData;
    };
    /**
     * Clean the cached content so all frames must be unloaded.
     *
     * @param setId the set id number.
     * @param full making full clean to reset the cache state.
     */
    IFrameCache.prototype.clean = function (setId, full) {
        var setData = this.getSetData(setId);
        for (var id = 0; id < setData.count; id++) {
            var frameData = setData.frameDataCollection[id];
            if (frameData) {
                this.cacheOut(frameData);
            }
        }
        if (full) {
            this.setSetData(setId, null);
        }
    };
    /**
     * Update module data with router information.
     *
     * @param setId the set id of frames.
     * @param name the name of module.
     * @param openPath the open url path within the module.
     * @return Observable<FrameDataEvent> the event data observable.
     */
    IFrameCache.prototype.update = function (setId, name, entryPoint, openPath) {
        var frameData;
        var activeFrameData;
        var unloadFrameData;
        var type;
        var timestamp = Date.now();
        var setData = this.getSetData(setId);
        if (!setData) {
            throw new Error('Level {0} frame has not been initialized.'.format(setId));
        }
        // update the active frame now.
        if (setData.activeIndex !== null) {
            activeFrameData = setData.frameDataCollection[setData.activeIndex];
            activeFrameData.timestamp = timestamp;
            if (activeFrameData.name === name && activeFrameData.openPath === openPath) {
                // check the iframe source and if it's the same, don't reload the iframe
                // this happens when the user clicks on the breadcrumb item for the
                // tool root (ex: honolulu > nodeName> ToolName (<- this one) > Overview)
                // this triggers a new value in the this.route.params observable.
                // but we don't want t unload and reload the iframe'
                type = FrameDataEventType.Noop;
                frameData = activeFrameData;
                return { type: type, frameData: frameData };
            }
        }
        var activeCount = 0;
        var freeIds = [];
        for (var id = 0; id < setData.count; id++) {
            var item = setData.frameDataCollection[id];
            if (!item) {
                freeIds.push(id);
            }
            else {
                // find oldest/aged frame data.
                activeCount++;
                if (!unloadFrameData) {
                    unloadFrameData = item;
                }
                else if (item.timestamp < unloadFrameData.timestamp) {
                    unloadFrameData = item;
                }
                // find existing cached item.
                if (item.name === name && item.openPath === openPath) {
                    this.cacheIn(false, item);
                    frameData = item;
                    type = FrameDataEventType.Swap;
                    return { type: type, frameData: frameData, activeFrameData: activeFrameData };
                }
            }
        }
        // create a new frame data from free slot.
        frameData = {
            id: freeIds[0],
            setId: setId,
            name: name,
            entryPoint: entryPoint,
            openPath: openPath,
            timestamp: timestamp,
            loadedDeferred: NativeQ.defer()
        };
        if (activeCount === setData.count - 1) {
            // cache is full. need to remain one free slot.
            this.cacheOut(unloadFrameData);
            this.cacheIn(true, frameData);
            type = FrameDataEventType.PushedOut;
            if (activeFrameData === unloadFrameData) {
                return { type: type, frameData: frameData, unloadFrameData: unloadFrameData };
            }
            return { type: type, frameData: frameData, activeFrameData: activeFrameData, unloadFrameData: unloadFrameData };
        }
        this.cacheIn(true, frameData);
        type = FrameDataEventType.AddOnly;
        return { type: type, frameData: frameData, activeFrameData: activeFrameData };
    };
    IFrameCache.prototype.cacheIn = function (added, frameData) {
        var setData = this.getSetData(frameData.setId);
        setData.activeIndex = frameData.id;
        if (added) {
            setData.frameDataCollection[frameData.id] = frameData;
        }
    };
    IFrameCache.prototype.cacheOut = function (frameData) {
        var setData = this.getSetData(frameData.setId);
        setData.frameDataCollection[frameData.id] = null;
        if (setData.activeIndex === frameData.id) {
            setData.activeIndex = null;
        }
    };
    return IFrameCache;
}());
export { IFrameCache };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2lmcmFtZS9pZnJhbWUtY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQU9ILE9BQU8sRUFFVixNQUFNLGVBQWUsQ0FBQztBQWdKdkIsTUFBTSxDQUFOLElBQVksa0JBS1g7QUFMRCxXQUFZLGtCQUFrQjtJQUMxQixpRUFBTyxDQUFBO0lBQ1AscUVBQVMsQ0FBQTtJQUNULDJEQUFJLENBQUE7SUFDSiwyREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUxXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFLN0I7QUF1Q0Q7O0dBRUc7QUFDSDtJQUFBO1FBQ1ksZUFBVSxHQUFtQixFQUFFLENBQUM7SUFxSzVDLENBQUM7SUFuS0c7Ozs7Ozs7T0FPRztJQUNJLDBCQUFJLEdBQVgsVUFBWSxLQUFhLEVBQUUsS0FBYSxFQUFFLE9BQWdCLEVBQUUsY0FBOEI7UUFDdEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsRixDQUFDO1FBRUQsSUFBSSxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNoQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDbkMsQ0FBQztRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBZ0IsRUFBRSxLQUFLLE9BQUEsRUFBRSxtQkFBbUIscUJBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxjQUFjLGdCQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQy9HLENBQUM7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QUFDLENBQUMsQ0FBQztZQUNwQywrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM5QixJQUFJLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsQ0FBQztZQUNoRCxDQUFDO1lBRUQsTUFBTSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsZUFBZSxpQkFBQSxFQUFFLGVBQWUsaUJBQUEsRUFBRSxDQUFDO1FBQ2pFLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM5QixJQUFJLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLGVBQWUsaUJBQUEsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFTyw2QkFBTyxHQUFmLFVBQWdCLEtBQWMsRUFBRSxTQUFvQjtRQUNoRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQzFELENBQUM7SUFDTCxDQUFDO0lBRU8sOEJBQVEsR0FBaEIsVUFBaUIsU0FBb0I7UUFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0F0S0EsQUFzS0MsSUFBQSIsImZpbGUiOiJpZnJhbWUtY2FjaGUuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9