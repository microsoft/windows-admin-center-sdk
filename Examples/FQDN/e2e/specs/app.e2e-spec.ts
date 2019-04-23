import { Settings, TestManager, Utils } from '@microsoft/windows-admin-center-sdk/e2e';
import { DefaultUI } from '../ui/DefaultUI';

TestManager.doTest<DefaultUI>(new DefaultUI('Tool'), (testManager, testSuite) => {
    const strings = require('../../assets/strings/strings.json');

    testSuite.describe(
        'Events',
        () => {

            testSuite.beforeEach(async () => {
                await testManager.goToConnectionAndToolAsync(
                    Settings.connection, 'tools/FQDN');
            });

            testSuite.it('Example e2e test', async () => {

            });
        },
        ['servers']);
});
