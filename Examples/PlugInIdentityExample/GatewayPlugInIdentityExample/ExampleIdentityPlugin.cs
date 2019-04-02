namespace Microsoft.ManagementExperience.GatewayPlugInIdentityExample
{
    using Microsoft.ManagementExperience.FeatureInterface;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Example plugin that illustrates how to use the new identity features in gateway plugins.
    /// </summary>
    public class ExampleIdentityPlugIn : HttpPlugIn
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExampleIdentityPlugIn"/> class.
        /// </summary>
        public ExampleIdentityPlugIn()
            : base("ExampleIdentity")
        {
        }

        /// <summary>
        /// Override for the Process method that specifies the actions that the plugin will execute.
        /// </summary>
        /// <param name="url">The requested plug-in <see cref="PlugInUrl">URL</see>.</param>
        /// <param name="request">The <see cref="HttpRequestMessage">HTTP request</see> to process.</param>
        /// <param name="cancellationToken">The <see cref="CancellationToken">token</see> that can be used to cancel the operation.</param>
        /// <returns>The <see cref="Task{TResult}"/> containing the <see cref="HttpResponseMessage">HTTP response</see>.</returns>
        protected override  async Task<HttpResponseMessage> Process(PlugInUrl url, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            await Task.Yield();

            var message = new StringBuilder($"Hello world from '{this.Name}' (running as {this.User.Identity.Name}");

            if (!StringComparer.OrdinalIgnoreCase.Equals(this.User.Identity.Name, this.NetworkIdentity.Name))
            {
                message.Append($", managing as {this.NetworkIdentity.Name}");
            }

            message.Append(')');

            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(message.ToString(), Encoding.UTF8, "text/plain"),
            };
        }
    }
}
