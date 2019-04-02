namespace Microsoft.ManagementExperience.GatewayPlugInIdentityExample
{
    using Microsoft.ManagementExperience.Extensibility.Capabilities;
    using Microsoft.ManagementExperience.FeatureInterface;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Represents a plugin that is capable of falling back on Manage As credentials when needed.
    /// </summary>
    public class ManageAsIdentityExample : HttpPlugIn
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExampleIdentityPlugIn"/> class.
        /// </summary>
        public ManageAsIdentityExample()
            : base("ManageAsIdentity")
        {
        }

        /// <summary>
        /// Override for the Process method that specifies the actions that the plugin will execute.
        /// </summary>
        /// <param name="url">The requested plug-in <see cref="PlugInUrl">URL</see>.</param>
        /// <param name="request">The <see cref="HttpRequestMessage">HTTP request</see> to process.</param>
        /// <param name="cancellationToken">The <see cref="CancellationToken">token</see> that can be used to cancel the operation.</param>
        /// <returns>The <see cref="Task{TResult}"/> containing the <see cref="HttpResponseMessage">HTTP response</see>.</returns>
        protected override async Task<HttpResponseMessage> Process(PlugInUrl url, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            await Task.Yield();

            var credentials = this.GetWindowsCredential(url.TargetNode);

            var message = new StringBuilder($"Hello world from '{this.Name}' (running as { credentials.UserName }");

            // You can get access to the "manage as" credentials like this:
            var tempPassword = credentials.Password;

            message.Append(')');

            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(message.ToString(), Encoding.UTF8, "text/plain"),
            };
            throw new NotImplementedException();
        }
    }
}
