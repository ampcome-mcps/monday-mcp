#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { MondayAgentToolkit } from '@mondaydotcomorg/agent-toolkit/mcp';
import { parseArgs, validateArgs } from './utils/args/args.service.js';
import { get_access_token } from './auth/nango.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Initializes and starts the MCP server with the Monday Agent Toolkit
 * Uses stdio for transport
 */

async function runServer() {
  const args = process.argv.slice(2);
  const parsedArgs = parseArgs(args);
  const validatedArgs = validateArgs(parsedArgs);

  // Get the token either from Nango or from the direct token argument
  let mondayApiToken: string;
  if (validatedArgs.useNango) {
    console.log('Using Nango for authentication...');
    mondayApiToken = await get_access_token();
  } else {
    console.log('Using direct token authentication...');
    mondayApiToken = validatedArgs.token!;
  }

  const toolkit = new MondayAgentToolkit({
    mondayApiToken,
    mondayApiVersion: validatedArgs.version,
    mondayApiRequestConfig: {},
    toolsConfiguration: {
      readOnlyMode: validatedArgs.readOnlyMode,
      enableDynamicApiTools: validatedArgs.enableDynamicApiTools,
      mode: validatedArgs.mode,
      enableToolManager: false,
    },
  });

  const transport = new StdioServerTransport();
  await toolkit.connect(transport);
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
