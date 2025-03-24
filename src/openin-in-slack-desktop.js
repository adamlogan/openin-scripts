
// Update the workspace lookup to your teamID
// slack url: https://randomteam.slack.com/archives/R123ABCXYZ/p9876543210123456

const workspaceLookup = {
    'cymaspace': 'T02H78D8G/C02H78D8Y'
};

try {
    url.protocol = 'slack';

    // Extract workspace name from the URL host
    const workspaceName = url.hostname.split('.')[0];
    const teamId = workspaceLookup[workspaceName];

    if (!teamId) {
        throw new Error(`Workspace ${workspaceName} not found in lookup.`);
    }

    // Extract Channel ID and Timestamp from the URL path
    const pathSegments = url.pathname.split('/');
    const channelId = pathSegments[2];
    const timestamp = pathSegments[3].replace('p', ''); // Remove the 'p' prefix in timestamp

    // Update the URL with new format (remove hostname)
    url.hostname = 'channel'; // Remove the workspace hostname
    url.pathname = '';
    url.searchParams.set('team', teamId);
    url.searchParams.set('id', channelId);
    url.searchParams.set('message', timestamp);

} catch (error) {
    console.log(`Error converting URL: ${error.message}`);
}
