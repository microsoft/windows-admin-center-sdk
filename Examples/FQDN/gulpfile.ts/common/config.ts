/**
 * Minimum information to control common gulp files.
 */
export interface Config {
    resjson: {
        /**
         * The prefix name of ResJSON resource key used on strings.resjson.
         */
        resourceName: string;

        /**
         * The depth of loc/output folder.
         */
        localeOffset: number;

        /**
         * The output folder of localized strings.
         */
        localePath: string;
    };
    powershell: {
        /**
         * Skip processing the powershell code.
         */
        skip?: boolean;

        /**
         * The name of PowerShell module.
         */
        name: string;

        /**
         * The GUID of PowerShell module.
         */
        guid: string;

        /**
         * The list of PowerShell script folders.
         */
        list: string[];

        /**
         * Enable the pester test.
         */
        enablePester: boolean;

        /**
         * Skip the CIM generator.
         */
        skipCim?: boolean;

        /**
         * Skip the module generator.
         */
        skipModule?: boolean;

        /**
         * Skip the resjson resource string generator.
         */
        skipResjson?: boolean;

        /**
         * Skip the manifest resource generator.
         */
        skipManifest?: boolean;
    };
}
