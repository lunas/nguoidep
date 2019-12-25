import api from './base'

export function getPages(issue_id) {
    return api.get(`issues/${issue_id}/pages`)
}
