import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    // Get inputs
    const apiKey = core.getInput('api-key', { required: true });
    const repository = core.getInput('repository');
    const prNumber = core.getInput('pr-number');
    const actionType = core.getInput('action-type', { required: true });
    
    // Parse repository owner and name
    const [owner, repo] = repository.split('/');
    
    // Initialize Octokit
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN || '');
    
    // Get repository ID
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });
    
    // Call CodeBeaver API
    const response = await fetch('https://bkn.codebeaver.ai/api/webhook/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        type: 'pull_request',
        git_provider_service: 'github',
        action: actionType,
        git_provider_id: repoData.id.toString(),
        pr_number: prNumber
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`CodeBeaver API error: ${errorText}`);
    }

    const result = await response.json();
    core.info('CodeBeaver API Response:' + JSON.stringify(result, null, 2));

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();