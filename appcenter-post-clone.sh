#!/usr/bin/env bash
# Based on https://github.com/microsoft/appcenter/issues/237#issuecomment-527991036.
#
# An SSH key pair has been generated for use by VS App Center. The public key is configured in GitLab under an internal
# user account, and the private key is configured in VS App Center as a secure environment variable.
#
# If the public or private key is ever lost:
#  1. Generate a new SSH key pair
#  2. Save the public key in GitLab
#  3. Run the following command to convert the private key to base64 and copy it to the clipboard:
#     cat /path/to/private/key | tr -d '\r' | base64 | pbcopy
#  4. Update the VS App Center Android and iOS builds to use the clipboard value for the GITLAB_SSH_KEY environment
#     variable.

echo "Creating ~/.ssh directory"
mkdir -p ~/.ssh

echo "Adding GitLab to SSH known hosts"
ssh-keyscan -t rsa gitlab.com >> ~/.ssh/known_hosts

echo "Adding GitLab SSH key"
echo $GITLAB_SSH_KEY | base64 -D > ~/.ssh/gitlab-ssh
chmod 600 ~/.ssh/gitlab-ssh
ssh-add ~/.ssh/gitlab-ssh
