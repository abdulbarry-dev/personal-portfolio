/*
 * API Integration Composable
 * This composable should contain:
 * - HTTP request wrapper functions
 * - Error handling and retry logic
 * - Loading state management
 * - Request/response interceptors
 * - Cache management for API responses
 * 
 * Functions to export:
 * - useApi() - main composable function
 * - get(url, options) - GET request
 * - post(url, data, options) - POST request
 * - put(url, data, options) - PUT request
 * - delete(url, options) - DELETE request
 * 
 * Return values:
 * - loading: Ref<boolean>
 * - error: Ref<string | null>
 * - data: Ref<any>
 * - execute: Function
 * - refresh: Function
 */
