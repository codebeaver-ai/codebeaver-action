import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    // Get inputs
    const apiKey = core.getInput('api-key', { required: true });
    const repository = core.getInput('repository');
    const prNumber = core.getInput('pr-number');
    const actionType = core.getInput('action-type', { required: true });
    const commitSha = core.getInput('commit_sha');

    // Parse repository owner and name
    const [owner, repo] = repository.split('/');
    
    // Initialize Octokit
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN || '');
    
    // Get repository ID
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    // Determine event type based on PR number
    const eventType = prNumber ? 'pull_request' : 'push';
    core.info(`Processing ${eventType} event`);

    // Prepare API payload
    const payload: any = {
      type: eventType,
      git_provider_service: 'github',
      action: actionType,
      git_provider_id: repoData.id.toString(),
      commit_sha: commitSha
    };

    // Add PR number only for pull_request events
    if (eventType === 'pull_request') {
      payload.pr_number = prNumber;
    }
    
    core.debug(`Sending payload to CodeBeaver API: ${JSON.stringify(payload, null, 2)}`);

    // Call CodeBeaver API
    const response = await fetch('https://bkn.codebeaver.ai/api/webhook/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`CodeBeaver API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    core.info('CodeBeaver API Response:' + JSON.stringify(result, null, 2));

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unexpected error occurred');
    }
  }
}

run();