// <copyright file="SampleHttpPlugIn.cs" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

namespace Microsoft.ManagementExperience.Samples
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.ManagementExperience.FeatureInterface;

    /// <summary>
    /// Represents a sample HTTP plug-in.
    /// </summary>
    public class SampleHttpPlugIn : HttpPlugIn
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SampleHttpPlugIn"/> class.
        /// </summary>
        public SampleHttpPlugIn()
            : base("Sample Uno")
        {
        }

        /// <summary>
        /// Processes the specified request.
        /// </summary>
        /// <param name="url">The requested plug-in <see cref="PlugInUrl">URL</see>.</param>
        /// <param name="request">The <see cref="HttpRequestMessage">HTTP request</see> to process.</param>
        /// <param name="cancellationToken">The <see cref="CancellationToken">token</see> that can be used to cancel the operation.</param>
        /// <returns>The <see cref="Task{TResult}"/> containing the <see cref="HttpResponseMessage">HTTP response</see>.</returns>
        protected override async Task<HttpResponseMessage> Process(PlugInUrl url, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // simulate long-running operation
            await Task.Delay(1000).ConfigureAwait(false);

            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent($"Hello world from '{this.Name}'", Encoding.UTF8, "text/plain"),
            };
        }
    }
}