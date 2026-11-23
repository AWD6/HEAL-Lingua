/* ============================================================
   HEAL Lingua — Real-Time Usage Analytics Dashboard
   Connected to Google Sheets (HEAL English Usage: usage_log)
   ============================================================ */

const HEAL_USAGE_SHEET_ID = '1V8BbTHHskILGxXm5b9W7mjDqMg01L39Z7fAvxo5EsOc';
const HEAL_LIVE_EVENTS_STORAGE_KEY = 'heal_usage_live_events_v1';
const HEAL_REMOTE_CACHE_STORAGE_KEY = 'heal_usage_remote_cache_v1';

// Verified baseline records synced directly from Google Sheet 'usage_log'
const HEAL_SHEET_BASELINE_RECORDS = [{"id":"c6a91087-7dba-4be3-a064-7bea6030cb1e","room":"OPD 2","ts":"2026-10-12T17:16:19.085Z","dateKey":"2026-10-13","count":1},{"id":"508cc781-0dcf-4632-bd99-97a5506b91da","room":"OPD 2","ts":"2026-10-12T17:18:36.168Z","dateKey":"2026-10-13","count":1},{"id":"c284801d-71c5-4b7a-8b35-7458f8d203e0","room":"OPD 2","ts":"2026-10-12T17:25:12.928Z","dateKey":"2026-10-13","count":1},{"id":"23af0c4c-07d7-4961-8096-af82164fbb6e","room":"OPD 2","ts":"2026-10-12T17:58:33.978Z","dateKey":"2026-10-13","count":1},{"id":"463afc57-0d32-4c2c-bd9b-a3a6a82d471d","room":"OPD 2","ts":"2026-10-12T18:00:56.648Z","dateKey":"2026-10-13","count":1},{"id":"52109e6e-67c9-44f6-8080-eccec3fbf9b9","room":"OPD 2","ts":"2026-10-12T18:01:59.953Z","dateKey":"2026-10-13","count":1},{"id":"df32fdfd-e30f-40bc-8036-4e3a1608a64d","room":"OPD 2","ts":"2026-10-12T18:02:22.812Z","dateKey":"2026-10-13","count":1},{"id":"772c0437-3039-4cdc-8041-7fa9b58b84af","room":"OPD 2","ts":"2026-10-12T18:05:11.841Z","dateKey":"2026-10-13","count":1},{"id":"21a55770-85a1-424c-a203-613398026a4f","room":"OPD 2","ts":"2026-10-12T18:06:10.026Z","dateKey":"2026-10-13","count":1},{"id":"9ad7df0a-72f9-4c2e-b863-c0f685941ee6","room":"OPD 2","ts":"2026-10-12T18:09:37.566Z","dateKey":"2026-10-13","count":1},{"id":"d459e921-1e7f-43b3-b0c8-66d0217cb638","room":"OPD 2","ts":"2026-10-12T18:12:13.439Z","dateKey":"2026-10-13","count":1},{"id":"e770efeb-2074-4bf8-95b8-2688f4478eb1","room":"OPD 2","ts":"2026-10-12T18:15:33.215Z","dateKey":"2026-10-13","count":1},{"id":"34490180-50e1-429f-8a16-4514d8fed24f","room":"OPD 2","ts":"2026-10-12T18:18:01.598Z","dateKey":"2026-10-13","count":1},{"id":"493cf55c-8052-4ff4-bb66-8abc544e565e","room":"OPD 2","ts":"2026-10-12T18:24:09.782Z","dateKey":"2026-10-13","count":1},{"id":"f7a45efc-6f36-49be-b04d-424a671ce122","room":"OPD 2","ts":"2026-10-12T18:26:26.218Z","dateKey":"2026-10-13","count":1},{"id":"5dc55981-2da9-418f-a1fa-23d7a158bccb","room":"OPD 2","ts":"2026-10-12T18:29:56.086Z","dateKey":"2026-10-13","count":1},{"id":"0e414c2d-294a-4b34-b924-a2cbaa974ca6","room":"OPD 2","ts":"2026-10-12T18:34:50.772Z","dateKey":"2026-10-13","count":1},{"id":"b56fafda-d9cb-46d1-8e31-474215a330dd","room":"OPD 2","ts":"2026-10-12T18:35:15.145Z","dateKey":"2026-10-13","count":1},{"id":"36f06181-fcb7-4323-bf97-1dd7b941fff5","room":"OPD 2","ts":"2026-10-12T18:38:08.353Z","dateKey":"2026-10-13","count":1},{"id":"b3161994-baa2-48a2-80bf-7773ca788a41","room":"OPD 2","ts":"2026-10-12T18:38:15.788Z","dateKey":"2026-10-13","count":1},{"id":"0c4fc9d4-9f20-44ec-bb79-020f4f6f4f6f","room":"OPD 2","ts":"2026-10-12T18:38:43.530Z","dateKey":"2026-10-13","count":1},{"id":"e8d9f720-e038-4f88-8841-bb39f664399c","room":"OPD 2","ts":"2026-10-12T18:42:13.895Z","dateKey":"2026-10-13","count":1},{"id":"3528fc98-4986-4041-b50d-c9b4670535e6","room":"OPD 2","ts":"2026-10-12T18:47:31.777Z","dateKey":"2026-10-13","count":1},{"id":"4c09890f-50a9-4c7e-bcdd-76006bcc0c7b","room":"OPD 2","ts":"2026-10-12T18:50:55.033Z","dateKey":"2026-10-13","count":1},{"id":"51f38f59-2f41-4cf7-adbe-07dec8940f34","room":"OPD 2","ts":"2026-10-12T19:04:17.198Z","dateKey":"2026-10-13","count":1},{"id":"5c15846d-1484-4460-b31b-580ce801d8ae","room":"OPD 2","ts":"2026-10-12T19:04:29.952Z","dateKey":"2026-10-13","count":1},{"id":"1dc4c60e-4b6c-439a-bc10-d7fd376a05a4","room":"OPD 2","ts":"2026-10-12T19:05:35.707Z","dateKey":"2026-10-13","count":1},{"id":"415b4367-5b13-42da-85cc-a4b17eb49517","room":"OPD 2","ts":"2026-10-12T19:05:54.817Z","dateKey":"2026-10-13","count":1},{"id":"cb27574a-934f-4d28-966e-1d17bf4b4561","room":"OPD 2","ts":"2026-10-12T19:07:14.345Z","dateKey":"2026-10-13","count":1},{"id":"7262922c-a33f-4f46-beec-017f5f627c51","room":"OPD 2","ts":"2026-10-12T19:07:58.593Z","dateKey":"2026-10-13","count":1},{"id":"6a2394ac-3e02-467c-8a8a-6a31ee9669ab","room":"OPD 2","ts":"2026-10-12T19:10:40.525Z","dateKey":"2026-10-13","count":1},{"id":"cf5bcc49-9725-4847-bf71-36bd2ddbba71","room":"OPD 2","ts":"2026-10-12T19:11:55.542Z","dateKey":"2026-10-13","count":1},{"id":"e21f3302-32c7-4a9c-a629-a9ce8fb65d60","room":"OPD 2","ts":"2026-10-12T19:20:48.673Z","dateKey":"2026-10-13","count":1},{"id":"2ab336b1-a850-445e-acb7-8b192338b979","room":"OPD 2","ts":"2026-10-13T06:05:34.090Z","dateKey":"2026-10-13","count":1},{"id":"0e18ccbc-368a-4bf7-8b4e-37c65831b83b","room":"OPD 2","ts":"2026-10-13T06:29:39.891Z","dateKey":"2026-10-13","count":1},{"id":"1cf6d7b7-afba-4ba5-92ba-8149183fcd09","room":"OPD 2","ts":"2026-10-13T06:42:14.414Z","dateKey":"2026-10-13","count":1},{"id":"1bf5d0ce-4e18-42a3-867f-3df63c8e5afd","room":"OPD 2","ts":"2026-10-13T07:05:18.837Z","dateKey":"2026-10-13","count":1},{"id":"5a0401cc-91e6-4de4-a54e-41c00f42ea1f","room":"OPD 2","ts":"2026-10-13T07:13:15.547Z","dateKey":"2026-10-13","count":1},{"id":"d7a52e79-1eb8-4524-91b3-61da38905082","room":"OPD 2","ts":"2026-10-13T07:26:58.823Z","dateKey":"2026-10-13","count":1},{"id":"b62d2347-1bcb-444f-89a6-b17dc2690ddb","room":"OPD 2","ts":"2026-10-13T07:31:08.157Z","dateKey":"2026-10-13","count":1},{"id":"acdea9f0-9488-4bcb-97d4-acfd09472a0d","room":"OPD 2","ts":"2026-10-13T07:36:20.467Z","dateKey":"2026-10-13","count":1},{"id":"ef407dfa-eb84-4d65-a870-b3c1a6ecdd07","room":"OPD 2","ts":"2026-10-13T07:47:22.393Z","dateKey":"2026-10-13","count":1},{"id":"57c6714e-fc22-4403-9f76-d4406d197739","room":"OPD 2","ts":"2026-10-13T08:10:45.908Z","dateKey":"2026-10-13","count":1},{"id":"b6f72810-144d-48e8-aa69-edfe8d3f812d","room":"OPD 2","ts":"2026-10-13T08:59:05.554Z","dateKey":"2026-10-13","count":1},{"id":"197b161e-ca04-4c58-8e71-e8e477835eda","room":"OPD 2","ts":"2026-10-13T08:59:35.293Z","dateKey":"2026-10-13","count":1},{"id":"f162a4a4-c499-4e01-b624-f00ef88bea19","room":"OPD 2","ts":"2026-10-13T08:59:48.644Z","dateKey":"2026-10-13","count":1},{"id":"4a9142b5-dee4-42c8-9549-b00a2024eae1","room":"OPD 2","ts":"2026-10-13T09:27:14.739Z","dateKey":"2026-10-13","count":1},{"id":"89a0a4ad-a8e4-4944-9af4-bb0981d8c00c","room":"OPD 2","ts":"2026-10-13T09:29:45.876Z","dateKey":"2026-10-13","count":1},{"id":"02a50b70-98ef-4c71-b079-bb0194778069","room":"OPD 2","ts":"2026-10-13T12:55:58.621Z","dateKey":"2026-10-13","count":1},{"id":"856e2861-001e-4687-a43e-17ff44559645","room":"OPD 2","ts":"2026-10-13T13:02:00.317Z","dateKey":"2026-10-13","count":1},{"id":"021f1f18-9559-4f14-bf8c-36f68e199460","room":"OPD 2","ts":"2026-10-13T13:02:05.173Z","dateKey":"2026-10-13","count":1},{"id":"318aa5e7-94b3-42e7-8a42-fd4da16dd3f7","room":"OPD 2","ts":"2026-10-13T13:03:39.508Z","dateKey":"2026-10-13","count":1},{"id":"e97648f0-aaa7-4105-a6fd-03f7bb126b9f","room":"OPD 2","ts":"2026-10-13T13:07:35.097Z","dateKey":"2026-10-13","count":1},{"id":"e3b01395-00e8-4eeb-8f38-567ad95dde51","room":"OPD 2","ts":"2026-10-13T13:07:57.011Z","dateKey":"2026-10-13","count":1},{"id":"17efc387-6cd4-4bc2-ba0f-a1b67df59258","room":"OPD 2","ts":"2026-10-13T13:17:25.564Z","dateKey":"2026-10-13","count":1},{"id":"22789927-9fdd-47bf-9821-13b40563c62d","room":"OPD 2","ts":"2026-10-13T13:24:56.888Z","dateKey":"2026-10-13","count":1},{"id":"c224fc85-4713-42c1-87ae-0304fe67003a","room":"OPD 2","ts":"2026-10-13T13:26:57.286Z","dateKey":"2026-10-13","count":1},{"id":"7bb558f6-7f00-4607-924a-e5925378b648","room":"OPD 2","ts":"2026-10-13T13:27:19.551Z","dateKey":"2026-10-13","count":1},{"id":"2959761e-00fd-41a5-9f36-a0bc4f8ca62f","room":"OPD 2","ts":"2026-10-13T13:28:21.832Z","dateKey":"2026-10-13","count":1},{"id":"90714cac-82be-4807-977b-5f4f7096c2b8","room":"OPD 2","ts":"2026-10-13T13:29:05.418Z","dateKey":"2026-10-13","count":1},{"id":"a2819ace-86ea-453c-930d-1cc19fb5dbaa","room":"OPD 2","ts":"2026-10-13T13:38:11.456Z","dateKey":"2026-10-13","count":1},{"id":"ab76fa9c-1243-49b4-a073-78b84658d539","room":"OPD 2","ts":"2026-10-13T13:46:59.319Z","dateKey":"2026-10-13","count":1},{"id":"3331b24a-b441-41ec-b7f8-23929b1bfe9e","room":"OPD 2","ts":"2026-10-13T13:57:25.574Z","dateKey":"2026-10-13","count":1},{"id":"5dc7cf40-2a85-45c3-bd50-41de37436587","room":"OPD 2","ts":"2026-10-13T14:04:54.306Z","dateKey":"2026-10-13","count":1},{"id":"72e8ec7e-4592-4bc2-8102-d7d691f3e668","room":"OPD 2","ts":"2026-10-13T14:09:48.589Z","dateKey":"2026-10-13","count":1},{"id":"5cb098b7-07ff-46ed-96d2-a26dd876ca3c","room":"OPD 2","ts":"2026-10-13T14:15:37.788Z","dateKey":"2026-10-13","count":1},{"id":"24dd7bcf-f2ef-4a89-90f0-0f1ae383868c","room":"OPD 2","ts":"2026-10-13T14:21:16.670Z","dateKey":"2026-10-13","count":1},{"id":"f4aa53a2-aa7f-4467-9482-6c6cb453ba41","room":"OPD 2","ts":"2026-10-13T14:22:29.924Z","dateKey":"2026-10-13","count":1},{"id":"206d21f6-1e34-4728-b102-1c02c88bcbc9","room":"OPD 2","ts":"2026-10-13T14:34:46.949Z","dateKey":"2026-10-13","count":1},{"id":"51ddd934-ddd0-4a58-baba-e593387036d0","room":"OPD 2","ts":"2026-10-13T14:47:46.693Z","dateKey":"2026-10-13","count":1},{"id":"573dcd76-661c-41a8-b278-cb4a6dd5fd16","room":"OPD 2","ts":"2026-10-14T01:32:14.699Z","dateKey":"2026-10-14","count":1},{"id":"335c8623-d5a4-4f2b-9e04-c6198d530639","room":"OPD 2","ts":"2026-10-14T08:07:23.094Z","dateKey":"2026-10-14","count":1},{"id":"f327fcbb-a545-4176-9ea0-ea89b686629f","room":"OPD 2","ts":"2026-10-14T11:02:04.307Z","dateKey":"2026-10-14","count":1},{"id":"9891885a-a867-46c3-8aa8-b37e94d613c6","room":"OPD 2","ts":"2026-10-14T11:06:03.982Z","dateKey":"2026-10-14","count":1},{"id":"25beb839-5262-4504-b832-a59e9f12b7b0","room":"OPD 2","ts":"2026-10-14T11:09:16.028Z","dateKey":"2026-10-14","count":1},{"id":"e00f59d0-3c4f-4481-a52e-f84ddb5cd544","room":"OPD 2","ts":"2026-10-14T11:10:08.593Z","dateKey":"2026-10-14","count":1},{"id":"b580c426-f368-487c-b338-f3782f898b75","room":"OPD 2","ts":"2026-10-14T11:14:41.290Z","dateKey":"2026-10-14","count":1},{"id":"b950a6d2-bfbf-454e-b691-a23bc0e620ab","room":"OPD 2","ts":"2026-10-14T16:36:54.191Z","dateKey":"2026-10-14","count":1},{"id":"ef7ac7d5-07fd-4642-b9f7-aefe53367bf6","room":"OPD 2","ts":"2026-10-15T01:59:41.676Z","dateKey":"2026-10-15","count":1},{"id":"99c6c877-4b47-43a9-8d70-36be3b8fc7ac","room":"OPD 2","ts":"2026-10-15T02:03:50.907Z","dateKey":"2026-10-15","count":1},{"id":"26d18098-5414-4690-8235-75a6177fe9c6","room":"OPD 2","ts":"2026-10-15T02:23:06.034Z","dateKey":"2026-10-15","count":1},{"id":"938f4ef6-5f06-4858-ae4a-9e0488b69668","room":"OPD 2","ts":"2026-10-15T02:23:57.202Z","dateKey":"2026-10-15","count":1},{"id":"29c66503-8d35-4056-81f7-011000359e57","room":"OPD 2","ts":"2026-10-15T02:24:16.690Z","dateKey":"2026-10-15","count":1},{"id":"f52c8eae-3a8a-4549-a7ea-0937f9ea787f","room":"OPD 2","ts":"2026-10-16T01:56:25.007Z","dateKey":"2026-10-16","count":1},{"id":"5cb21dc7-3797-47dc-8afd-b7237c4d1a8c","room":"OPD 2","ts":"2026-10-16T01:57:55.770Z","dateKey":"2026-10-16","count":1},{"id":"31cf72ef-ebec-4141-a78a-b20ab3067fe4","room":"OPD 2","ts":"2026-10-16T01:59:14.431Z","dateKey":"2026-10-16","count":1},{"id":"8c8b4d8a-ec73-47b7-be49-5a470cb43d2f","room":"OPD 2","ts":"2026-10-16T02:01:10.385Z","dateKey":"2026-10-16","count":1},{"id":"0efe54c5-f9b6-458d-847b-aaf35ea7b0ce","room":"OPD 2","ts":"2026-10-16T06:08:32.588Z","dateKey":"2026-10-16","count":1},{"id":"605edd07-8fbf-4803-8de9-f935b4dc3763","room":"OPD 2","ts":"2026-10-17T19:16:50.229Z","dateKey":"2026-10-18","count":1},{"id":"fe42bf72-f037-4e96-94e4-9172a982cf61","room":"OPD 2","ts":"2026-10-17T19:19:12.169Z","dateKey":"2026-10-18","count":1},{"id":"5f8b2f9a-6451-43e3-b2d9-fd3757ecbf96","room":"OPD 2","ts":"2026-10-17T19:51:53.853Z","dateKey":"2026-10-18","count":1},{"id":"42f3d8b5-6cd6-4693-bf0b-428b90f1e2c9","room":"OPD 2","ts":"2026-10-18T05:21:18.875Z","dateKey":"2026-10-18","count":1},{"id":"a5c87769-a937-409a-bd97-9c8ae216027e","room":"OPD 2","ts":"2026-10-18T05:22:28.523Z","dateKey":"2026-10-18","count":1},{"id":"f543a7e4-7de1-4890-a0d1-aa697d46aac4","room":"OPD 2","ts":"2026-10-18T06:15:42.185Z","dateKey":"2026-10-18","count":1},{"id":"5b677e55-2e4e-4ff5-8dbc-20a8bab07d22","room":"OPD 2","ts":"2026-10-18T06:25:52.732Z","dateKey":"2026-10-18","count":1},{"id":"d5685901-63a5-4b11-bf1e-f8747da20a5f","room":"OPD 2","ts":"2026-10-18T06:42:07.332Z","dateKey":"2026-10-18","count":1},{"id":"22199cd8-ffeb-46b1-b5fe-a795a2232282","room":"OPD 2","ts":"2026-10-18T06:42:54.137Z","dateKey":"2026-10-18","count":1},{"id":"59b23e08-5c9b-4d52-b951-a5239a522dbf","room":"OPD 2","ts":"2026-10-18T07:10:20.814Z","dateKey":"2026-10-18","count":1},{"id":"bfb138c9-3bb4-458d-a1a9-2681ec0c7a4c","room":"OPD 2","ts":"2026-10-18T07:24:01.261Z","dateKey":"2026-10-18","count":1},{"id":"c6d9423a-3ee7-47d1-8f1a-b905cf790d9f","room":"OPD 2","ts":"2026-10-18T07:52:23.098Z","dateKey":"2026-10-18","count":1},{"id":"32694337-413c-432d-902a-87d3bf07ce9e","room":"OPD 2","ts":"2026-10-18T12:32:20.287Z","dateKey":"2026-10-18","count":1},{"id":"b13051e4-d6e0-4a5d-8403-d6be71d98a5f","room":"OPD 2","ts":"2026-10-18T12:33:27.844Z","dateKey":"2026-10-18","count":1},{"id":"9034c3d4-e8eb-4ec3-ad79-1ece436b244a","room":"OPD 1","ts":"2026-10-18T13:41:11.413Z","dateKey":"2026-10-18","count":1},{"id":"d07df3f1-4879-409a-bf04-7801d63d52c1","room":"OPD 1","ts":"2026-10-18T13:42:14.333Z","dateKey":"2026-10-18","count":1},{"id":"6ef31b9b-cbb1-4200-a087-4f8e79182536","room":"OPD 1","ts":"2026-10-18T13:43:19.868Z","dateKey":"2026-10-18","count":1},{"id":"44aa2d50-8b8c-48d6-9195-3abde5a86ed0","room":"OPD 1","ts":"2026-10-18T13:43:42.319Z","dateKey":"2026-10-18","count":1},{"id":"f53e1b48-9ac1-4966-8c2d-eac04b959167","room":"OPD 1","ts":"2026-10-18T13:44:41.389Z","dateKey":"2026-10-18","count":1},{"id":"711ed600-2077-47bb-a2b5-4bc2b151bffd","room":"OPD 1","ts":"2026-10-18T13:45:10.949Z","dateKey":"2026-10-18","count":1},{"id":"0441fe6d-5bb6-4ed0-9453-4d3bb12f6ff8","room":"OPD 1","ts":"2026-10-18T13:45:39.945Z","dateKey":"2026-10-18","count":1},{"id":"d9855b66-6bef-4f63-9ee5-3dd9c53a145d","room":"OPD 1","ts":"2026-10-18T13:46:00.813Z","dateKey":"2026-10-18","count":1},{"id":"b4d41bb7-37f1-4995-b94e-03fa42131dfb","room":"OPD 1","ts":"2026-10-18T13:48:14.650Z","dateKey":"2026-10-18","count":1},{"id":"f6cb985c-ca67-472b-af4d-59891539ad45","room":"OPD 2","ts":"2026-10-18T14:33:30.133Z","dateKey":"2026-10-18","count":1},{"id":"cca163b6-b54b-4f16-ae5f-382056bb6cf7","room":"OPD 2","ts":"2026-10-18T14:34:30.394Z","dateKey":"2026-10-18","count":1},{"id":"9f4eaba4-c81f-4684-9897-9fb5646637f4","room":"OPD 2","ts":"2026-10-18T14:34:44.835Z","dateKey":"2026-10-18","count":1},{"id":"e64db243-cfc9-49c4-8bdf-6a1799a99155","room":"OPD 2","ts":"2026-10-18T14:35:31.281Z","dateKey":"2026-10-18","count":1},{"id":"9dd7c03f-5239-401c-be9f-c6f54deb2a88","room":"OPD 1","ts":"2026-10-18T15:01:55.320Z","dateKey":"2026-10-18","count":1},{"id":"f8ef8b87-dced-4f56-9ef1-8b0001a5b4a9","room":"OPD 1","ts":"2026-10-18T15:04:16.927Z","dateKey":"2026-10-18","count":1},{"id":"a07b9018-47fd-42d5-aebc-2843caccad50","room":"OPD 1","ts":"2026-10-18T15:04:47.234Z","dateKey":"2026-10-18","count":1},{"id":"f8ca6182-a280-48ad-9c83-9a8ed56e1e4e","room":"OPD 1","ts":"2026-10-18T15:06:30.813Z","dateKey":"2026-10-18","count":1},{"id":"dea52590-008d-4968-aae6-5c409f3b1274","room":"OPD 1","ts":"2026-10-18T15:07:28.598Z","dateKey":"2026-10-18","count":1},{"id":"84e0765c-2660-48d6-8cdd-3d1517ebe06b","room":"OPD 1","ts":"2026-10-18T15:07:57.246Z","dateKey":"2026-10-18","count":1},{"id":"04117a10-5a00-4ae3-8cc0-c603166ea8ad","room":"OPD 1","ts":"2026-10-18T15:25:47.712Z","dateKey":"2026-10-18","count":1},{"id":"f1c50f44-4f9c-4c1f-bf0f-1e5a80026fe9","room":"OPD 1","ts":"2026-10-18T15:26:52.473Z","dateKey":"2026-10-18","count":1},{"id":"3aab3cd2-a0fd-4a52-af38-a7df01ed13b1","room":"OPD 1","ts":"2026-10-18T15:27:43.338Z","dateKey":"2026-10-18","count":1},{"id":"932e0b03-7537-46a5-994d-18af0a7eace7","room":"OPD 1","ts":"2026-10-18T15:28:10.721Z","dateKey":"2026-10-18","count":1},{"id":"75aafe12-4454-42a0-9a34-5daa4090cb28","room":"OPD 1","ts":"2026-10-18T15:28:19.053Z","dateKey":"2026-10-18","count":1},{"id":"7be9c688-d4af-46a9-a400-1ba50293fcae","room":"OPD 1","ts":"2026-10-18T15:28:31.854Z","dateKey":"2026-10-18","count":1},{"id":"bcdda19f-47da-451b-9373-82852bfaed22","room":"OPD 1","ts":"2026-10-18T15:28:40.171Z","dateKey":"2026-10-18","count":1},{"id":"a8069fb4-156c-4059-8567-ff05a12f6f35","room":"OPD 1","ts":"2026-10-18T15:28:49.004Z","dateKey":"2026-10-18","count":1},{"id":"29939c96-80d3-4b30-9b6c-866e832b2b0a","room":"OPD 1","ts":"2026-10-18T15:31:44.000Z","dateKey":"2026-10-18","count":1},{"id":"71c891e8-08c1-4ee0-99c6-76cc729f52a0","room":"OPD 1","ts":"2026-10-18T15:31:50.841Z","dateKey":"2026-10-18","count":1},{"id":"20025fc5-4012-44e7-ad7b-fd752678195b","room":"OPD 1","ts":"2026-10-18T15:31:59.261Z","dateKey":"2026-10-18","count":1},{"id":"ee66a252-03e7-413b-9bc1-2a098dd46cb9","room":"OPD 1","ts":"2026-10-18T15:32:07.158Z","dateKey":"2026-10-18","count":1},{"id":"a866a054-f390-4dc8-9d38-676ad8154b7b","room":"OPD 1","ts":"2026-10-18T15:32:15.240Z","dateKey":"2026-10-18","count":1},{"id":"8b47c456-197b-44d9-9af4-5aaa8234c05e","room":"OPD 1","ts":"2026-10-18T15:32:23.583Z","dateKey":"2026-10-18","count":1},{"id":"fd3a1ee9-8042-454b-b697-84cd568729d6","room":"OPD 2","ts":"2026-10-18T18:00:28.824Z","dateKey":"2026-10-19","count":1},{"id":"a624dd69-f271-4e6b-a2d2-75e750631d00","room":"OPD 2","ts":"2026-10-18T18:01:47.058Z","dateKey":"2026-10-19","count":1},{"id":"d954e4f9-62f9-4f0c-957c-c432807ff237","room":"OPD 1","ts":"2026-10-19T02:23:24.496Z","dateKey":"2026-10-19","count":1},{"id":"bc2c5d16-0530-4fd2-a84f-3f02576ca7a1","room":"OPD 2","ts":"2026-10-19T06:31:41.241Z","dateKey":"2026-10-19","count":1},{"id":"a56c9250-678d-4f77-8a1b-aaa00536a2aa","room":"OPD 2","ts":"2026-10-19T06:33:29.200Z","dateKey":"2026-10-19","count":1},{"id":"389e0949-9480-41b3-ba77-1cd65912fbc0","room":"OPD 2","ts":"2026-10-19T06:34:44.823Z","dateKey":"2026-10-19","count":1},{"id":"dcf4c9e7-2674-437b-921c-d6d0ff57313c","room":"OPD 2","ts":"2026-10-19T06:35:36.679Z","dateKey":"2026-10-19","count":1},{"id":"70acfdb9-c907-45d9-a720-d923191fff8f","room":"OPD 2","ts":"2026-10-19T06:37:29.707Z","dateKey":"2026-10-19","count":1},{"id":"8caccbb3-0a25-420b-8fa4-faf748275016","room":"OPD 2","ts":"2026-10-19T07:02:59.632Z","dateKey":"2026-10-19","count":1},{"id":"ae041938-9c79-427e-a0e1-04f39dcfadaf","room":"OPD 2","ts":"2026-10-19T07:06:36.982Z","dateKey":"2026-10-19","count":1},{"id":"f2650a00-a1d9-4b3d-9167-b461548f71f0","room":"OPD 1","ts":"2026-10-19T09:22:56.614Z","dateKey":"2026-10-19","count":1},{"id":"1d3b789b-dee0-45c4-a39f-f618381d5cb8","room":"OPD 1","ts":"2026-10-19T09:23:04.396Z","dateKey":"2026-10-19","count":1},{"id":"33c55224-fab5-4054-8030-af614146ab45","room":"OPD 2","ts":"2026-10-19T16:21:17.885Z","dateKey":"2026-10-19","count":1},{"id":"77362e19-108d-484e-8a28-1b6c13a1d6ac","room":"OPD 2","ts":"2026-10-19T16:22:46.196Z","dateKey":"2026-10-19","count":1},{"id":"feb38fc3-3d98-4b89-b573-499878c34697","room":"OPD 2","ts":"2026-10-19T16:37:32.619Z","dateKey":"2026-10-19","count":1},{"id":"d33b1953-b61c-463b-affa-909369660430","room":"OPD 2","ts":"2026-10-19T16:48:08.099Z","dateKey":"2026-10-19","count":1},{"id":"5cf8971d-9206-49d2-8352-9ecdead55d8c","room":"OPD 1","ts":"2026-10-20T15:24:12.277Z","dateKey":"2026-10-20","count":1},{"id":"78a4e4bf-a659-431c-a784-a227840757f2","room":"ห้องให้ยาเคมีบำบัด","ts":"2026-10-27T02:42:02.698Z","dateKey":"2026-10-27","count":1},{"id":"3d72e458-c097-4b72-8c01-63ab9ff8131e","room":"OPD 2","ts":"2026-11-01T14:12:21.431Z","dateKey":"2026-11-01","count":1},{"id":"79cf5f0b-01e7-4924-ba94-914b04325943","room":"OPD 2","ts":"2026-11-01T17:44:26.503Z","dateKey":"2026-11-02","count":1},{"id":"82774aac-52c0-46ca-bf7b-268925449e08","room":"OPD 1","ts":"2026-11-02T03:12:42.766Z","dateKey":"2026-11-02","count":1},{"id":"bef3c53d-5187-4c35-9119-0498a379cc78","room":"OPD 28","ts":"2026-11-02T03:14:26.761Z","dateKey":"2026-11-02","count":1},{"id":"8320ca62-4c10-42f2-a2c6-1452dba2deb5","room":"OPD 1","ts":"2026-11-02T03:20:49.672Z","dateKey":"2026-11-02","count":1},{"id":"5b25a053-b4c5-4e3c-b0cd-b7c05f5f9c35","room":"OPD 2","ts":"2026-11-02T03:21:03.786Z","dateKey":"2026-11-02","count":1},{"id":"5498d5db-8a8b-4940-9cf4-cdc8ecd58f07","room":"Telemedicine","ts":"2026-11-02T03:34:37.231Z","dateKey":"2026-11-02","count":1},{"id":"75a1cdfe-2aac-40a7-8521-c914d7ba27b2","room":"OPD 1","ts":"2026-11-02T03:35:01.076Z","dateKey":"2026-11-02","count":1},{"id":"d618fa22-68f9-44e9-94ff-3ce560c6fa85","room":"OPD 2","ts":"2026-11-02T03:38:20.910Z","dateKey":"2026-11-02","count":1},{"id":"27da0018-7cbd-4658-915f-d59e57071269","room":"OPD 1","ts":"2026-11-02T06:24:12.511Z","dateKey":"2026-11-02","count":1},{"id":"09dd2017-1fe7-4759-b5b9-51226b4fa34e","room":"OPD 101","ts":"2026-11-02T15:00:44.202Z","dateKey":"2026-11-02","count":1},{"id":"7f93bd4c-babb-4a34-8d87-ca93cc41133f","room":"OPD 2","ts":"2026-11-02T16:24:07.627Z","dateKey":"2026-11-02","count":1},{"id":"226aafa7-1412-4067-83fd-70b34b41ef38","room":"OPD 2","ts":"2026-11-02T16:27:30.539Z","dateKey":"2026-11-02","count":1},{"id":"ad519212-6ac8-4d15-827f-81c1606fecf8","room":"OPD 2","ts":"2026-11-03T10:13:51.425Z","dateKey":"2026-11-03","count":1},{"id":"643e7369-50d9-4326-953e-5f2744568e6a","room":"OPD 2","ts":"2026-11-03T10:29:30.248Z","dateKey":"2026-11-03","count":1},{"id":"6c5fc27b-6626-4f49-a33d-69652172b466","room":"OPD 2","ts":"2026-11-03T16:29:06.965Z","dateKey":"2026-11-03","count":1},{"id":"4b350048-c1d2-4de8-a15a-6187e91d53b2","room":"OPD 1","ts":"2026-11-04T02:59:18.073Z","dateKey":"2026-11-04","count":1},{"id":"a3950e23-132e-43ea-b716-1384704cbdd5","room":"OPD 2","ts":"2026-11-06T16:05:25.652Z","dateKey":"2026-11-06","count":1},{"id":"2401a7d0-de25-4200-bc72-0243be1f8b9c","room":"OPD 2","ts":"2026-11-08T17:57:20.485Z","dateKey":"2026-11-09","count":1},{"id":"b2faa96f-aa93-4e29-a855-a30db2b80256","room":"OPD 1","ts":"2026-11-08T18:31:57.621Z","dateKey":"2026-11-09","count":1},{"id":"8cc971e1-abe9-493c-ace9-9caaca140dfe","room":"OPD 2","ts":"2026-11-08T18:32:31.687Z","dateKey":"2026-11-09","count":1},{"id":"85e555e3-4c20-438b-ba15-e4c6141f342b","room":"OPD 2","ts":"2026-11-08T18:34:38.048Z","dateKey":"2026-11-09","count":1},{"id":"760d5b3e-f1ff-43bd-b3df-5c88c86ac50b","room":"OPD 2","ts":"2026-11-09T09:05:16.557Z","dateKey":"2026-11-09","count":1},{"id":"f7165474-79a9-411d-a4f8-ff98bbeb0cb3","room":"OPD 2","ts":"2026-11-10T14:18:36.638Z","dateKey":"2026-11-10","count":1},{"id":"531b4d84-87e9-4e97-b32f-171913dae6c2","room":"EMS","ts":"2026-11-11T03:08:42.590Z","dateKey":"2026-11-11","count":1},{"id":"2514cf2f-1b0b-4a4a-8f63-cd44e13e3b07","room":"Refer","ts":"2026-11-11T03:09:01.130Z","dateKey":"2026-11-11","count":1},{"id":"15c965bf-fd93-445d-89ba-0b60dec14163","room":"3","ts":"2026-11-11T03:09:46.123Z","dateKey":"2026-11-11","count":1},{"id":"dafa5d91-a9e9-4ac2-8b4e-4b420e323fd7","room":"Retina","ts":"2026-11-11T03:10:07.843Z","dateKey":"2026-11-11","count":1},{"id":"d050995b-e7eb-4564-9c81-25bf8aec1baa","room":"EID complex","ts":"2026-11-11T03:10:30.204Z","dateKey":"2026-11-11","count":1},{"id":"9326f43e-efbf-4204-b8ed-08b190f0996d","room":"OPD 1","ts":"2026-11-11T03:11:08.804Z","dateKey":"2026-11-11","count":1},{"id":"601d31b7-9a78-4194-a7e7-c4023c10d3c2","room":"ออร์โธ","ts":"2026-11-11T03:11:13.803Z","dateKey":"2026-11-11","count":1},{"id":"5704243f-1563-4893-bdd7-d2ec67de2ef5","room":"OPD 1","ts":"2026-11-11T03:11:15.226Z","dateKey":"2026-11-11","count":1},{"id":"309a65cb-b3e8-46f3-a563-03d1f7023f9a","room":"ฝ่ายการพยาบาล","ts":"2026-11-11T03:11:33.669Z","dateKey":"2026-11-11","count":1},{"id":"63b5e3ce-4d99-4b00-adbd-b84553a54d53","room":"OPD 2","ts":"2026-11-11T03:11:44.615Z","dateKey":"2026-11-11","count":1},{"id":"5d660c9f-aea6-4027-ab0b-a7fc539bff8e","room":"NSO","ts":"2026-11-11T03:11:45.607Z","dateKey":"2026-11-11","count":1},{"id":"9c3d56c0-36d7-437a-b316-c301c8ab3203","room":"MNS","ts":"2026-11-11T03:11:48.329Z","dateKey":"2026-11-11","count":1},{"id":"fc35d101-1303-4a82-a34d-4662884b928c","room":"ธุรการ","ts":"2026-11-11T03:12:01.325Z","dateKey":"2026-11-11","count":1},{"id":"4ca05ff9-39af-4047-adba-fb6c83140c96","room":"Ob","ts":"2026-11-11T03:12:26.699Z","dateKey":"2026-11-11","count":1},{"id":"7c94f253-a90b-40fc-a3a1-d2c7f603ea48","room":"OR","ts":"2026-11-11T03:12:28.200Z","dateKey":"2026-11-11","count":1},{"id":"e984eded-2aa7-4829-9a9e-cf2faeb557b3","room":"ฝ่าย","ts":"2026-11-11T03:13:19.717Z","dateKey":"2026-11-11","count":1},{"id":"f599683d-0466-47a7-8525-e7a0b74b66fd","room":"OPD 2","ts":"2026-11-11T03:13:47.489Z","dateKey":"2026-11-11","count":1},{"id":"5e2f7da5-eb66-4c4c-896a-107fdf0dc947","room":"NSO","ts":"2026-11-11T03:13:53.644Z","dateKey":"2026-11-11","count":1},{"id":"44a2a8eb-0a77-47ea-b128-4e7bb45fc2d4","room":"Ob","ts":"2026-11-11T03:14:01.131Z","dateKey":"2026-11-11","count":1},{"id":"3bbb9f05-d399-449c-9de7-38672ea8070f","room":"Ward","ts":"2026-11-11T03:14:20.233Z","dateKey":"2026-11-11","count":1},{"id":"7fac9ae1-43ac-48a9-905f-ada4e78e2882","room":"OPD 1","ts":"2026-11-11T03:14:29.240Z","dateKey":"2026-11-11","count":1},{"id":"0961e130-6e55-4cb3-9891-0f684f9f4e44","room":"NSO","ts":"2026-11-11T03:15:06.786Z","dateKey":"2026-11-11","count":1},{"id":"90046d77-a93e-4283-8942-0066c09e9360","room":"NAC","ts":"2026-11-11T03:15:55.429Z","dateKey":"2026-11-11","count":1},{"id":"baea3924-249f-4c0f-b797-f5c3bc7c84c2","room":"OPD 2","ts":"2026-11-11T03:16:39.949Z","dateKey":"2026-11-11","count":1},{"id":"081fad3c-9d64-4f6c-ae2b-c61f440c05f3","room":"Ward","ts":"2026-11-11T03:17:27.632Z","dateKey":"2026-11-11","count":1},{"id":"fd537676-431b-4a27-a6d1-31b0c08d8c7c","room":"Ward","ts":"2026-11-11T03:19:22.650Z","dateKey":"2026-11-11","count":1},{"id":"886bfd90-02be-4fc5-9eca-15194b33cf78","room":"Nac","ts":"2026-11-11T03:20:10.777Z","dateKey":"2026-11-11","count":1},{"id":"b5ff7d24-4aad-4247-a26c-8e2e9d2e75ef","room":"Ward","ts":"2026-11-11T03:23:08.985Z","dateKey":"2026-11-11","count":1},{"id":"17962832-76f6-4f6f-b1e3-bdc9f292c386","room":"Ward","ts":"2026-11-11T03:24:34.570Z","dateKey":"2026-11-11","count":1},{"id":"c8f32fb4-5580-4fe4-a597-81271b208fe3","room":"Ward","ts":"2026-11-11T03:25:02.486Z","dateKey":"2026-11-11","count":1},{"id":"8d674d45-f81a-49f4-9d71-3f0cf6291cec","room":"OPD 1","ts":"2026-11-11T04:43:51.971Z","dateKey":"2026-11-11","count":1},{"id":"200b771f-1b58-49aa-9dfa-2c1a470324ab","room":"OPD 1","ts":"2026-11-11T04:50:02.546Z","dateKey":"2026-11-11","count":1},{"id":"171ed105-19c9-4062-8346-444b89ab5805","room":"OPD 1","ts":"2026-11-11T06:01:58.285Z","dateKey":"2026-11-11","count":1},{"id":"24df85d1-61f5-4abe-b241-f1b939fa0de1","room":"OPD 10","ts":"2026-11-11T06:02:33.735Z","dateKey":"2026-11-11","count":1},{"id":"70882b63-8796-455a-80fe-9afae09c2871","room":"OPD 28","ts":"2026-11-11T06:34:07.691Z","dateKey":"2026-11-11","count":1},{"id":"c25ee6bb-786e-4823-bc9a-18062e7ee36f","room":"OPD 21","ts":"2026-11-11T06:51:39.919Z","dateKey":"2026-11-11","count":1},{"id":"6c06f603-bcbd-42f3-a6e0-862b72069f03","room":"OPD 6","ts":"2026-11-11T06:41:59.689Z","dateKey":"2026-11-11","count":1},{"id":"77718f67-14c3-4575-aa07-cbce2cfce4f1","room":"EID complex","ts":"2026-11-11T06:52:19.812Z","dateKey":"2026-11-11","count":1},{"id":"8e70d44b-2e65-4165-a951-6054a498480c","room":"OPD 1","ts":"2026-11-11T07:06:30.708Z","dateKey":"2026-11-11","count":1},{"id":"89620721-66d6-41db-b36e-a74d5346e67e","room":"Ward","ts":"2026-11-11T07:06:34.039Z","dateKey":"2026-11-11","count":1},{"id":"e58ba906-1d6b-4751-86e0-22a1932f4886","room":"OPD 6","ts":"2026-11-11T07:07:08.225Z","dateKey":"2026-11-11","count":1},{"id":"689f30e6-b331-4b16-9c13-3c528fea0b9e","room":"OPD 7","ts":"2026-11-11T07:07:42.807Z","dateKey":"2026-11-11","count":1},{"id":"7efa6b06-c683-47ac-9dee-84a27d71cf33","room":"OPD 1","ts":"2026-11-11T07:09:32.527Z","dateKey":"2026-11-11","count":1},{"id":"3122ac2b-2495-432b-9965-09da218fd6d0","room":"Ward","ts":"2026-11-11T07:10:04.397Z","dateKey":"2026-11-11","count":1},{"id":"707be644-b40e-4994-92df-515765d54d64","room":"OPD 6","ts":"2026-11-11T07:41:21.763Z","dateKey":"2026-11-11","count":1},{"id":"c3522485-0aaa-43c6-9578-e994c0ede8ad","room":"ฝ่าย","ts":"2026-11-11T12:54:39.314Z","dateKey":"2026-11-11","count":1},{"id":"cc2166e4-810a-4aaf-9e3e-bdd77119587c","room":"OPD 1","ts":"2026-11-12T02:41:45.452Z","dateKey":"2026-11-12","count":1},{"id":"62459fde-7427-40cf-8e9b-bcc19abadaae","room":"OPD 1","ts":"2026-11-12T23:19:41.731Z","dateKey":"2026-11-13","count":1},{"id":"82b6569c-1a77-49d3-a833-01e25cf7d1d2","room":"Telemedicine","ts":"2026-11-13T03:26:22.353Z","dateKey":"2026-11-13","count":1},{"id":"1553c57d-bd34-4d0d-8c37-d59fa05020e8","room":"OPD 1","ts":"2026-11-13T03:27:55.181Z","dateKey":"2026-11-13","count":1},{"id":"af41a259-88d7-420e-9816-3ec4adfece7c","room":"OPD 101","ts":"2026-11-13T03:29:27.301Z","dateKey":"2026-11-13","count":1},{"id":"c07b599e-9232-4477-82b9-588072ff2f89","room":"EID complex","ts":"2026-11-13T05:14:01.699Z","dateKey":"2026-11-13","count":1},{"id":"8f2548e4-db4e-471f-a997-0598c707d5d2","room":"OPD 1","ts":"2026-11-13T06:01:31.974Z","dateKey":"2026-11-13","count":1},{"id":"643713e2-68de-4fe3-a24d-37eab6c9458d","room":"OPD 21","ts":"2026-11-13T08:32:10.267Z","dateKey":"2026-11-13","count":1},{"id":"193ea381-d453-4df7-8ee4-e9b390008787","room":"OPD 21","ts":"2026-11-13T08:33:32.120Z","dateKey":"2026-11-13","count":1},{"id":"8fe0444a-3432-4230-bf71-eba4c469149b","room":"OPD 1","ts":"2026-11-13T08:34:53.200Z","dateKey":"2026-11-13","count":1},{"id":"b53a48c3-37b2-4cd0-b152-7ab80b95916a","room":"OPD 21","ts":"2026-11-13T08:35:03.521Z","dateKey":"2026-11-13","count":1},{"id":"0c3fa0ee-ee4f-46b0-b8c7-1ef594d42a89","room":"OPD 21","ts":"2026-11-13T08:38:35.325Z","dateKey":"2026-11-13","count":1},{"id":"7b3611fa-54ce-4d55-ba9b-d79cf4e6b61a","room":"OPD 21","ts":"2026-11-13T08:39:09.286Z","dateKey":"2026-11-13","count":1},{"id":"4aaf9f8f-4b6e-481c-b3cf-72636fa6d273","room":"OPD 21","ts":"2026-11-13T08:46:33.824Z","dateKey":"2026-11-13","count":1},{"id":"2aac68bc-9bc8-4d5c-b358-cd3470a484ae","room":"OPD 1","ts":"2026-11-14T04:43:54.572Z","dateKey":"2026-11-14","count":1},{"id":"f626dd75-5493-4846-baf3-ed5ff242a7bb","room":"EID complex","ts":"2026-11-16T07:34:47.090Z","dateKey":"2026-11-16","count":1},{"id":"767243dd-b14a-474b-8f30-c6f14be33b8a","room":"OPD 4","ts":"2026-11-16T07:34:51.866Z","dateKey":"2026-11-16","count":1},{"id":"60a92931-e4c9-40cf-a9cc-33b74c8297ea","room":"OPD 4","ts":"2026-11-16T07:35:53.011Z","dateKey":"2026-11-16","count":1},{"id":"65bb01f7-29ef-4479-a9c6-6118e55d107e","room":"OPD 27","ts":"2026-11-16T07:36:49.755Z","dateKey":"2026-11-16","count":1},{"id":"a035d892-29cb-4731-9f19-29f8dc44b829","room":"OPD 6","ts":"2026-11-16T07:40:57.621Z","dateKey":"2026-11-16","count":1},{"id":"abcb1a14-d56c-4341-90f7-e27e525fe211","room":"OPD 4","ts":"2026-11-16T07:42:19.496Z","dateKey":"2026-11-16","count":1},{"id":"215c50f3-b016-4a76-a9f6-43df9d7d1848","room":"OPD 23","ts":"2026-11-16T07:44:14.626Z","dateKey":"2026-11-16","count":1},{"id":"b3cbb4cc-8168-4eae-812a-deb785aedb26","room":"หอผู้ป่วยสังเกตอาการ","ts":"2026-11-16T07:46:57.383Z","dateKey":"2026-11-16","count":1},{"id":"864b1e81-5323-45ff-ad83-48280704802d","room":"OPD 27","ts":"2026-11-16T07:47:00.727Z","dateKey":"2026-11-16","count":1},{"id":"42d011e2-572b-423f-abd6-e929d0c3c9aa","room":"ห้องให้ยาเคมีบำบัด","ts":"2026-11-16T08:16:11.861Z","dateKey":"2026-11-16","count":1},{"id":"376685fd-744d-48b1-8484-62f5d38f8803","room":"ER","ts":"2026-11-16T08:16:48.910Z","dateKey":"2026-11-16","count":1},{"id":"627a048f-753e-455c-ba64-600872158b2f","room":"CSC","ts":"2026-11-16T08:16:55.075Z","dateKey":"2026-11-16","count":1},{"id":"70fdf744-ee4e-4129-98d6-d1f5d865816a","room":"CSC","ts":"2026-11-16T08:27:27.842Z","dateKey":"2026-11-16","count":1},{"id":"2cfda4e5-9aed-4db4-9d1a-b6c286cb744f","room":"OPD 1","ts":"2026-11-16T08:40:22.968Z","dateKey":"2026-11-16","count":1},{"id":"8da0514a-348f-490e-874b-8f397a2ceb36","room":"ห้องให้ยาเคมีบำบัด","ts":"2026-11-16T14:23:26.987Z","dateKey":"2026-11-16","count":1},{"id":"3246415f-497e-434d-87ca-475c045222e6","room":"ห้องให้ยาเคมีบำบัด","ts":"2026-11-17T05:18:38.232Z","dateKey":"2026-11-17","count":1},{"id":"76d9666e-077b-42c9-a1a9-5d866229166f","room":"NAC","ts":"2026-11-17T08:19:14.596Z","dateKey":"2026-11-17","count":1},{"id":"36c33712-e45f-4948-a46f-a99cd4999d2f","room":"OPD 1","ts":"2026-11-19T12:28:47.164Z","dateKey":"2026-11-19","count":1},{"id":"e6f94c97-0731-47ba-8b50-89739c6c7d05","room":"OPD 1","ts":"2026-11-19T17:00:57.303Z","dateKey":"2026-11-20","count":1},{"id":"093ff90c-a6a3-4aaf-81f1-f30e221db8e7","room":"NAC","ts":"2026-11-20T17:48:37.847Z","dateKey":"2026-11-21","count":1},{"id":"aee4b74f-b165-4c59-af7f-7d789374d689","room":"หอผู้ป่วยสังเกตอาการ","ts":"2026-11-21T05:40:07.331Z","dateKey":"2026-11-21","count":1},{"id":"fc9aa336-9878-45ad-a77a-e05616d1b6e5","room":"หอผู้ป่วยสังเกตอาการ","ts":"2026-11-22T04:06:15.286Z","dateKey":"2026-11-22","count":1},{"id":"a3e9e093-b0a8-4ee4-bc34-0a94ae959a11","room":"OPD 101","ts":"2026-11-23T08:32:21.377Z","dateKey":"2026-11-23","count":1},{"id":"2415c6b9-7cee-4a40-950d-4594b28255ba","room":"OPD 101","ts":"2026-11-23T08:51:54.543Z","dateKey":"2026-11-23","count":1},{"id":"db2bf7e5-773a-4781-9119-b9128cf55965","room":"OPD 101","ts":"2026-11-23T10:50:45.719Z","dateKey":"2026-11-23","count":1},{"id":"253b3428-5450-4d25-a86c-835de022e957","room":"OPD 1","ts":"2026-11-23T13:06:39.603Z","dateKey":"2026-11-23","count":1}];

const UNIT_ICONS = {
  'หน่วยที่ 1': 'fa-user-doctor',
  'หน่วยที่ 2': 'fa-stethoscope',
  'หน่วยที่ 3': 'fa-eye',
  'หน่วยที่ 4': 'fa-hospital-user',
  'หน่วยที่ 5': 'fa-notes-medical',
  'หน่วยที่ 6': 'fa-radiation',
  'หน่วยที่ 7': 'fa-shield-virus',
  'หน่วยที่ 8': 'fa-clinic-medical',
  'หน่วยผ่าตัดเล็ก': 'fa-kit-medical',
  'ฉุกเฉิน': 'fa-truck-medical',
  'สังเกตอาการ': 'fa-bed-pulse',
  'เคมีบำบัด': 'fa-syringe',
  'บริการแพทย์ฉุกเฉิน': 'fa-heart-pulse',
  'อื่นๆ': 'fa-building-user'
};

const THAI_MONTHS_SHORT = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const THAI_MONTHS_FULL = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

let dashboardState = {
  periodMode: 'all',        // 'all' | 'day' | 'month' | 'year' | 'range'
  selectedYear: '2026',     // Gregorian YYYY
  selectedMonth: '2026-11', // YYYY-MM
  selectedDate: '',         // YYYY-MM-DD
  rangeStart: '',           // YYYY-MM-DD
  rangeEnd: '',             // YYYY-MM-DD
  trendGranularity: 'day',  // 'day' | 'month' | 'year'
  selectedUnit: 'ALL',      // 'ALL' or unit group name
  showAllUnits: true,       // true = show all 14 units including 0-count units
  roomSearch: '',
  isSyncing: false,
  lastSyncTime: null,
  syncSourceLabel: 'Google Sheet (HEAL English Usage)',
  remoteRecords: null,
  autoRefreshTimer: null,
  broadcastChannel: null
};

function normalizeRoomName(rawRoom) {
  const trimmed = String(rawRoom || '').trim();
  if (!trimmed) return 'ไม่ระบุห้อง';
  if (/^nac$/i.test(trimmed)) return 'NAC';
  if (/^nso$/i.test(trimmed)) return 'NSO';
  if (/^mns$/i.test(trimmed)) return 'MNS';
  if (/^ems$/i.test(trimmed)) return 'EMS';
  if (/^er$/i.test(trimmed)) return 'ER';
  if (/^or$/i.test(trimmed)) return 'OR';
  if (/^ekg$/i.test(trimmed)) return 'EKG';
  if (/^pcu$/i.test(trimmed)) return 'PCU';
  if (/^csc$/i.test(trimmed)) return 'CSC';
  if (/^ob$/i.test(trimmed)) return 'OB';
  if (/^ward$/i.test(trimmed)) return 'Ward';
  return trimmed;
}

function getUnitForRoom(roomName) {
  const norm = normalizeRoomName(roomName);
  const groups = (typeof DEPT_GROUPS !== 'undefined' && Array.isArray(DEPT_GROUPS)) ? DEPT_GROUPS : [];
  for (const g of groups) {
    if (g.group === 'อื่นๆ') continue;
    for (const item of g.items) {
      if (item.toLowerCase() === norm.toLowerCase()) {
        return { unit: g.group, isCustom: false, canonicalRoom: item };
      }
    }
  }
  return { unit: 'อื่นๆ', isCustom: true, canonicalRoom: norm };
}

function getBangkokDateParts(tsOrDateKey, fallbackDateKey) {
  let dateKey = String(fallbackDateKey || '').trim();
  let hour = 12;
  let minute = 0;
  let timestampMs = 0;

  if (tsOrDateKey) {
    const d = new Date(tsOrDateKey);
    if (!isNaN(d.getTime())) {
      timestampMs = d.getTime();
      const bkk = new Date(timestampMs + 7 * 3600 * 1000);
      const yyyy = bkk.getUTCFullYear();
      const mm = String(bkk.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(bkk.getUTCDate()).padStart(2, '0');
      hour = bkk.getUTCHours();
      minute = bkk.getUTCMinutes();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
        dateKey = `${yyyy}-${mm}-${dd}`;
      }
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    dateKey = '2026-11-23';
  }
  const [yStr, mStr, dStr] = dateKey.split('-');
  const year = parseInt(yStr, 10) || 2026;
  const month = parseInt(mStr, 10) || 1;
  const day = parseInt(dStr, 10) || 1;
  const yearBE = year + 543;
  const monthKey = `${yStr}-${mStr}`;

  if (!timestampMs) {
    timestampMs = Date.parse(`${dateKey}T05:00:00Z`) || 0;
  }

  return {
    dateKey,
    monthKey,
    yearKey: yStr,
    year,
    yearBE,
    month,
    day,
    hour,
    minute,
    timestampMs
  };
}

function formatThaiDateShort(dateKey) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey || ''))) return String(dateKey || '—');
  const [y, m, d] = dateKey.split('-').map(n => parseInt(n, 10));
  const beShort = String(y + 543).slice(-2);
  return `${d} ${THAI_MONTHS_SHORT[(m - 1) || 0]} ${beShort}`;
}

function formatThaiDateFull(dateKey) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey || ''))) return String(dateKey || '—');
  const [y, m, d] = dateKey.split('-').map(n => parseInt(n, 10));
  return `${d} ${THAI_MONTHS_FULL[(m - 1) || 0]} ${y + 543}`;
}

function formatThaiMonthFull(monthKey) {
  if (!/^\d{4}-\d{2}$/.test(String(monthKey || ''))) return String(monthKey || '—');
  const [y, m] = monthKey.split('-').map(n => parseInt(n, 10));
  return `${THAI_MONTHS_FULL[(m - 1) || 0]} ${y + 543}`;
}

function formatThaiMonthShort(monthKey) {
  if (!/^\d{4}-\d{2}$/.test(String(monthKey || ''))) return String(monthKey || '—');
  const [y, m] = monthKey.split('-').map(n => parseInt(n, 10));
  return `${THAI_MONTHS_SHORT[(m - 1) || 0]} ${String(y + 543).slice(-2)}`;
}

function formatThaiDateTime(ts, dateKey) {
  const parts = getBangkokDateParts(ts, dateKey);
  const hh = String(parts.hour).padStart(2, '0');
  const mm = String(parts.minute).padStart(2, '0');
  return `${formatThaiDateShort(parts.dateKey)} · ${hh}:${mm} น.`;
}

function loadLocalLiveUsageEvents() {
  try {
    const raw = localStorage.getItem(HEAL_LIVE_EVENTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveLocalLiveUsageEvent(log) {
  if (!log || !log.room) return;
  const record = {
    id: String(log.id || `local_${Date.now()}`),
    room: String(log.room).trim(),
    ts: String(log.timestamp || log.ts || new Date().toISOString()),
    dateKey: String(log.dateKey || ''),
    count: Number(log.count) || 1
  };
  try {
    const existing = loadLocalLiveUsageEvents();
    if (!existing.some(item => item.id === record.id)) {
      existing.push(record);
      localStorage.setItem(HEAL_LIVE_EVENTS_STORAGE_KEY, JSON.stringify(existing.slice(-500)));
    }
  } catch (e) {}
  try {
    if (dashboardState.broadcastChannel) {
      dashboardState.broadcastChannel.postMessage({ type: 'usage-event', record });
    }
  } catch (e) {}
  dashboardState.lastSyncTime = new Date();
  renderUsageDashboard();
}

function loadCachedRemoteRecords() {
  try {
    const raw = localStorage.getItem(HEAL_REMOTE_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.records) && parsed.records.length ? parsed.records : null;
  } catch (e) {
    return null;
  }
}

function saveCachedRemoteRecords(records) {
  try {
    if (Array.isArray(records) && records.length) {
      localStorage.setItem(HEAL_REMOTE_CACHE_STORAGE_KEY, JSON.stringify({
        updatedAt: new Date().toISOString(),
        records
      }));
    }
  } catch (e) {}
}

function getAllNormalizedUsageRecords() {
  const byId = new Map();
  const addRecord = (rec, idxPrefix) => {
    if (!rec || !rec.room) return;
    const id = String(rec.id || `${idxPrefix}_${rec.room}_${rec.ts || rec.dateKey}`).trim();
    if (byId.has(id)) return;
    const unitInfo = getUnitForRoom(rec.room);
    const dateParts = getBangkokDateParts(rec.ts || rec.timestamp, rec.dateKey);
    byId.set(id, {
      id,
      rawRoom: String(rec.room).trim(),
      room: unitInfo.canonicalRoom,
      unit: unitInfo.unit,
      isCustom: unitInfo.isCustom,
      ts: rec.ts || rec.timestamp || '',
      dateKey: dateParts.dateKey,
      monthKey: dateParts.monthKey,
      yearKey: dateParts.yearKey,
      yearBE: dateParts.yearBE,
      hour: dateParts.hour,
      minute: dateParts.minute,
      timestampMs: dateParts.timestampMs,
      count: Math.max(1, Number(rec.count) || 1)
    });
  };

  if (Array.isArray(dashboardState.remoteRecords) && dashboardState.remoteRecords.length) {
    dashboardState.remoteRecords.forEach((r, i) => addRecord(r, `remote_${i}`));
  }
  HEAL_SHEET_BASELINE_RECORDS.forEach((r, i) => addRecord(r, `base_${i}`));
  loadLocalLiveUsageEvents().forEach((r, i) => addRecord(r, `local_${i}`));

  return Array.from(byId.values()).sort((a, b) => (b.timestampMs - a.timestampMs) || b.dateKey.localeCompare(a.dateKey));
}

function requestAppsScriptUsageJsonp(endpointUrl, timeoutMs = 6500) {
  return new Promise((resolve, reject) => {
    if (!endpointUrl) {
      reject(new Error('Missing endpoint'));
      return;
    }
    const callbackName = 'healUsageStatsCb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const script = document.createElement('script');
    let settled = false;
    const cleanup = () => {
      clearTimeout(timer);
      try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
      script.remove();
    };
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Usage stats JSONP timeout'));
    }, timeoutMs);

    window[callbackName] = (payload) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (payload && payload.ok && Array.isArray(payload.records)) {
        resolve(payload.records);
      } else {
        reject(new Error(payload?.error || 'Usage stats action not active on endpoint'));
      }
    };
    script.onerror = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Usage stats JSONP network error'));
    };
    const sep = endpointUrl.includes('?') ? '&' : '?';
    script.src = `${endpointUrl}${sep}action=usage-stats&callback=${encodeURIComponent(callbackName)}&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

function requestGoogleGvizUsageJsonp(timeoutMs = 5500) {
  return new Promise((resolve, reject) => {
    const callbackName = 'healGvizUsageCb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const script = document.createElement('script');
    let settled = false;
    const cleanup = () => {
      clearTimeout(timer);
      try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
      script.remove();
    };
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('gviz timeout'));
    }, timeoutMs);

    window[callbackName] = (resp) => {
      if (settled) return;
      settled = true;
      cleanup();
      try {
        const rows = resp?.table?.rows;
        if (!Array.isArray(rows) || !rows.length) {
          reject(new Error('Empty gviz table'));
          return;
        }
        const parsed = [];
        rows.forEach((r, idx) => {
          const c = r?.c || [];
          const id = String(c[0]?.v || '').trim();
          const room = String(c[1]?.v || '').trim();
          if (!room || room === 'room') return;
          const ts = String(c[3]?.v || c[3]?.f || '').trim();
          const dateKey = String(c[4]?.f || c[4]?.v || '').trim();
          const count = Number(c[5]?.v) || 1;
          parsed.push({ id: id || `gviz_${idx}`, room, ts, dateKey, count });
        });
        if (parsed.length) resolve(parsed);
        else reject(new Error('No valid gviz rows'));
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('gviz unauthorized or unavailable'));
    };
    script.src = `https://docs.google.com/spreadsheets/d/${HEAL_USAGE_SHEET_ID}/gviz/tq?tqx=responseHandler:${callbackName}&sheet=usage_log&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

async function syncUsageDashboardNow(showSpin = true) {
  if (dashboardState.isSyncing) return;
  dashboardState.isSyncing = true;
  if (showSpin) updateDashboardSyncIndicator();

  const endpoints = [];
  if (typeof GOOGLE_SHEETS_ENDPOINT === 'string' && GOOGLE_SHEETS_ENDPOINT.trim()) {
    endpoints.push(GOOGLE_SHEETS_ENDPOINT.trim());
  }
  if (typeof window.HEAL_TRANSLATOR_APPS_SCRIPT_URL === 'string' && window.HEAL_TRANSLATOR_APPS_SCRIPT_URL.trim()) {
    const u = window.HEAL_TRANSLATOR_APPS_SCRIPT_URL.trim();
    if (!endpoints.includes(u)) endpoints.push(u);
  }

  let fetchedRecords = null;
  let sourceLabel = 'Google Sheet · HEAL English Usage (Real-Time)';

  for (const ep of endpoints) {
    try {
      const records = await requestAppsScriptUsageJsonp(ep, 5500);
      if (Array.isArray(records) && records.length) {
        fetchedRecords = records;
        sourceLabel = 'Google Sheet Live API (usage_log)';
        break;
      }
    } catch (e) {}
  }

  if (!fetchedRecords) {
    try {
      const gvizRecords = await requestGoogleGvizUsageJsonp(4500);
      if (Array.isArray(gvizRecords) && gvizRecords.length) {
        fetchedRecords = gvizRecords;
        sourceLabel = 'Google Sheet Direct Feed (usage_log)';
      }
    } catch (e) {}
  }

  if (fetchedRecords && fetchedRecords.length) {
    dashboardState.remoteRecords = fetchedRecords;
    saveCachedRemoteRecords(fetchedRecords);
  }

  dashboardState.lastSyncTime = new Date();
  dashboardState.syncSourceLabel = sourceLabel;
  dashboardState.isSyncing = false;
  renderUsageDashboard();
}

function updateDashboardSyncIndicator() {
  const btn = document.getElementById('dashSyncBtn');
  const statusEl = document.getElementById('dashSyncStatusText');
  if (btn) {
    btn.disabled = dashboardState.isSyncing;
    const icon = btn.querySelector('i');
    if (icon) icon.classList.toggle('fa-spin', dashboardState.isSyncing);
  }
  if (statusEl && dashboardState.isSyncing) {
    statusEl.textContent = 'กำลังซิงก์ข้อมูลล่าสุดจาก Google Sheet…';
  }
}

function getFilteredDashboardRecords(allRecords) {
  const mode = dashboardState.periodMode;
  return allRecords.filter(rec => {
    if (mode === 'day' && dashboardState.selectedDate) {
      if (rec.dateKey !== dashboardState.selectedDate) return false;
    } else if (mode === 'month' && dashboardState.selectedMonth) {
      if (rec.monthKey !== dashboardState.selectedMonth) return false;
    } else if (mode === 'year' && dashboardState.selectedYear) {
      if (rec.yearKey !== dashboardState.selectedYear) return false;
    } else if (mode === 'range') {
      if (dashboardState.rangeStart && rec.dateKey < dashboardState.rangeStart) return false;
      if (dashboardState.rangeEnd && rec.dateKey > dashboardState.rangeEnd) return false;
    }
    return true;
  });
}

function getPeriodDescription(allRecords) {
  const mode = dashboardState.periodMode;
  if (mode === 'day' && dashboardState.selectedDate) {
    return `ประจำวันที่ ${formatThaiDateFull(dashboardState.selectedDate)}`;
  }
  if (mode === 'month' && dashboardState.selectedMonth) {
    return `ประจำเดือน ${formatThaiMonthFull(dashboardState.selectedMonth)}`;
  }
  if (mode === 'year' && dashboardState.selectedYear) {
    const be = (parseInt(dashboardState.selectedYear, 10) || 2026) + 543;
    return `ประจำปี พ.ศ. ${be} (${dashboardState.selectedYear})`;
  }
  if (mode === 'range') {
    const s = dashboardState.rangeStart ? formatThaiDateShort(dashboardState.rangeStart) : 'เริ่มต้น';
    const e = dashboardState.rangeEnd ? formatThaiDateShort(dashboardState.rangeEnd) : 'ปัจจุบัน';
    return `ช่วงวันที่ ${s} – ${e}`;
  }
  if (allRecords.length) {
    const dates = allRecords.map(r => r.dateKey).sort();
    return `ข้อมูลทั้งหมด (${formatThaiDateShort(dates[0])} – ${formatThaiDateShort(dates[dates.length - 1])})`;
  }
  return 'ข้อมูลทั้งหมด';
}

function setDashboardPeriodMode(mode) {
  dashboardState.periodMode = mode;
  const allRecords = getAllNormalizedUsageRecords();
  const availableDates = Array.from(new Set(allRecords.map(r => r.dateKey))).sort();
  const availableMonths = Array.from(new Set(allRecords.map(r => r.monthKey))).sort();
  const availableYears = Array.from(new Set(allRecords.map(r => r.yearKey))).sort();

  if (mode === 'day') {
    if (!dashboardState.selectedDate) {
      dashboardState.selectedDate = availableDates[availableDates.length - 1] || new Date().toISOString().slice(0, 10);
    }
    dashboardState.trendGranularity = 'day';
  } else if (mode === 'month') {
    if (!dashboardState.selectedMonth || !availableMonths.includes(dashboardState.selectedMonth)) {
      dashboardState.selectedMonth = availableMonths[availableMonths.length - 1] || new Date().toISOString().slice(0, 7);
    }
    dashboardState.trendGranularity = 'day';
  } else if (mode === 'year') {
    if (!dashboardState.selectedYear || !availableYears.includes(dashboardState.selectedYear)) {
      dashboardState.selectedYear = availableYears[availableYears.length - 1] || String(new Date().getFullYear());
    }
    dashboardState.trendGranularity = 'month';
  } else if (mode === 'range') {
    if (!dashboardState.rangeStart) dashboardState.rangeStart = availableDates[0] || '';
    if (!dashboardState.rangeEnd) dashboardState.rangeEnd = availableDates[availableDates.length - 1] || '';
    dashboardState.trendGranularity = 'day';
  } else {
    dashboardState.trendGranularity = 'day';
  }
  renderUsageDashboard();
}

function onDashboardDateChange(val) {
  dashboardState.selectedDate = val;
  renderUsageDashboard();
}

function onDashboardMonthChange(val) {
  dashboardState.selectedMonth = val;
  renderUsageDashboard();
}

function onDashboardYearChange(val) {
  dashboardState.selectedYear = val;
  renderUsageDashboard();
}

function onDashboardRangeChange() {
  const s = document.getElementById('dashRangeStart')?.value || '';
  const e = document.getElementById('dashRangeEnd')?.value || '';
  dashboardState.rangeStart = s;
  dashboardState.rangeEnd = e;
  renderUsageDashboard();
}

function setDashboardTrendGranularity(gran) {
  dashboardState.trendGranularity = gran;
  renderUsageDashboard();
}

function setDashboardUnitFilter(unitName) {
  dashboardState.selectedUnit = unitName;
  renderUsageDashboard();
}

function toggleDashboardShowAllUnits() {
  dashboardState.showAllUnits = !dashboardState.showAllUnits;
  renderUsageDashboard();
}

function onDashboardRoomSearch(val) {
  dashboardState.roomSearch = String(val || '').trim();
  renderDashboardRoomSection();
}

function buildTrendBuckets(records, granularity) {
  const map = new Map();
  if (granularity === 'year') {
    records.forEach(r => {
      const k = r.yearKey;
      map.set(k, (map.get(k) || 0) + r.count);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, count]) => ({
        key: k,
        label: `พ.ศ. ${(parseInt(k, 10) || 2026) + 543}`,
        fullLabel: `ปี พ.ศ. ${(parseInt(k, 10) || 2026) + 543} (${k})`,
        count
      }));
  }
  if (granularity === 'month') {
    records.forEach(r => {
      const k = r.monthKey;
      map.set(k, (map.get(k) || 0) + r.count);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, count]) => ({
        key: k,
        label: formatThaiMonthShort(k),
        fullLabel: formatThaiMonthFull(k),
        count
      }));
  }
  records.forEach(r => {
    const k = r.dateKey;
    map.set(k, (map.get(k) || 0) + r.count);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, count]) => ({
      key: k,
      label: formatThaiDateShort(k),
      fullLabel: formatThaiDateFull(k),
      count
    }));
}

function computeUnitAndRoomStats(records) {
  const totalCount = records.reduce((sum, r) => sum + r.count, 0);
  const groups = (typeof DEPT_GROUPS !== 'undefined' && Array.isArray(DEPT_GROUPS)) ? DEPT_GROUPS : [];

  const unitMap = new Map();
  groups.forEach(g => {
    const roomMap = new Map();
    if (g.group !== 'อื่นๆ') {
      g.items.forEach(item => roomMap.set(item, { room: item, unit: g.group, count: 0, lastDateKey: '', lastTs: 0, isCustom: false }));
    }
    unitMap.set(g.group, {
      unit: g.group,
      icon: UNIT_ICONS[g.group] || 'fa-hospital',
      officialRooms: g.group === 'อื่นๆ' ? [] : g.items.slice(),
      count: 0,
      rooms: roomMap
    });
  });

  const allRoomMap = new Map();
  groups.forEach(g => {
    if (g.group === 'อื่นๆ') return;
    g.items.forEach(item => {
      allRoomMap.set(item, {
        room: item,
        unit: g.group,
        count: 0,
        lastDateKey: '',
        lastTs: 0,
        isCustom: false
      });
    });
  });

  records.forEach(rec => {
    let uEntry = unitMap.get(rec.unit);
    if (!uEntry) {
      uEntry = {
        unit: rec.unit,
        icon: UNIT_ICONS[rec.unit] || 'fa-building-user',
        officialRooms: [],
        count: 0,
        rooms: new Map()
      };
      unitMap.set(rec.unit, uEntry);
    }
    uEntry.count += rec.count;

    let rEntry = uEntry.rooms.get(rec.room);
    if (!rEntry) {
      rEntry = {
        room: rec.room,
        unit: rec.unit,
        count: 0,
        lastDateKey: '',
        lastTs: 0,
        isCustom: rec.isCustom
      };
      uEntry.rooms.set(rec.room, rEntry);
    }
    rEntry.count += rec.count;
    if (rec.dateKey > rEntry.lastDateKey) rEntry.lastDateKey = rec.dateKey;
    if (rec.timestampMs > rEntry.lastTs) rEntry.lastTs = rec.timestampMs;

    let globalRoom = allRoomMap.get(rec.room);
    if (!globalRoom) {
      globalRoom = {
        room: rec.room,
        unit: rec.unit,
        count: 0,
        lastDateKey: '',
        lastTs: 0,
        isCustom: rec.isCustom
      };
      allRoomMap.set(rec.room, globalRoom);
    }
    globalRoom.count += rec.count;
    if (rec.dateKey > globalRoom.lastDateKey) globalRoom.lastDateKey = rec.dateKey;
    if (rec.timestampMs > globalRoom.lastTs) globalRoom.lastTs = rec.timestampMs;
  });

  const unitList = Array.from(unitMap.values()).map(u => {
    const roomsArr = Array.from(u.rooms.values()).sort((a, b) => (b.count - a.count) || a.room.localeCompare(b.room));
    const activeRoomsCount = roomsArr.filter(r => r.count > 0).length;
    const pct = totalCount > 0 ? (u.count / totalCount) * 100 : 0;
    return {
      ...u,
      roomsList: roomsArr,
      activeRoomsCount,
      pct
    };
  }).sort((a, b) => (b.count - a.count));

  const roomList = Array.from(allRoomMap.values())
    .map(r => ({
      ...r,
      pct: totalCount > 0 ? (r.count / totalCount) * 100 : 0
    }))
    .sort((a, b) => (b.count - a.count) || a.room.localeCompare(b.room));

  const customRooms = roomList.filter(r => r.isCustom && r.count > 0);

  return { totalCount, unitList, roomList, customRooms };
}

function computeShiftStats(records) {
  const shifts = [
    { id: 'morning', label: 'เวรเช้า (08:00–16:00)', icon: 'fa-sun', color: '#0d9488', count: 0 },
    { id: 'afternoon', label: 'เวรบ่าย (16:00–24:00)', icon: 'fa-cloud-sun', color: '#0284c7', count: 0 },
    { id: 'night', label: 'เวรดึก (00:00–08:00)', icon: 'fa-moon', color: '#7c3aed', count: 0 }
  ];
  records.forEach(r => {
    if (r.hour >= 8 && r.hour < 16) shifts[0].count += r.count;
    else if (r.hour >= 16) shifts[1].count += r.count;
    else shifts[2].count += r.count;
  });
  const total = records.reduce((s, r) => s + r.count, 0);
  shifts.forEach(s => { s.pct = total > 0 ? (s.count / total) * 100 : 0; });
  return shifts;
}

function renderUsageDashboard() {
  const container = document.getElementById('dashboardRoot');
  if (!container) return;

  const allRecords = getAllNormalizedUsageRecords();
  const filteredRecords = getFilteredDashboardRecords(allRecords);
  const { totalCount, unitList, roomList, customRooms } = computeUnitAndRoomStats(filteredRecords);
  const allTimeTotal = allRecords.reduce((s, r) => s + r.count, 0);

  const availableDates = Array.from(new Set(allRecords.map(r => r.dateKey))).sort().reverse();
  const availableMonths = Array.from(new Set(allRecords.map(r => r.monthKey))).sort().reverse();
  const availableYears = Array.from(new Set(allRecords.map(r => r.yearKey))).sort().reverse();

  const todayBkk = getBangkokDateParts(new Date().toISOString()).dateKey;
  const todayCount = allRecords.filter(r => r.dateKey === todayBkk).reduce((s, r) => s + r.count, 0);
  const currentMonthKey = todayBkk.slice(0, 7);
  const currentMonthCount = allRecords.filter(r => r.monthKey === currentMonthKey).reduce((s, r) => s + r.count, 0);

  const topUnit = unitList.find(u => u.count > 0) || { unit: '—', count: 0, pct: 0 };
  const activeRooms = roomList.filter(r => r.count > 0);
  const topRoom = activeRooms[0] || { room: '—', unit: '—', count: 0, pct: 0 };

  const dayBuckets = buildTrendBuckets(filteredRecords, 'day');
  const activeDaysCount = dayBuckets.length;
  const avgPerDay = activeDaysCount > 0 ? (totalCount / activeDaysCount).toFixed(1) : '0';
  const peakDay = dayBuckets.slice().sort((a, b) => b.count - a.count)[0] || null;

  const trendBuckets = buildTrendBuckets(filteredRecords, dashboardState.trendGranularity);
  const maxBucketCount = Math.max(1, ...trendBuckets.map(b => b.count));

  const shifts = computeShiftStats(filteredRecords);

  const syncTimeStr = dashboardState.lastSyncTime
    ? dashboardState.lastSyncTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' น.'
    : 'พร้อมใช้งาน';

  const topBadge = document.getElementById('headerTotalUsageBadge');
  if (topBadge) topBadge.textContent = `${allTimeTotal.toLocaleString()} ครั้ง`;

  let periodSubControlHtml = '';
  if (dashboardState.periodMode === 'day') {
    periodSubControlHtml = `
      <div class="dash-subfilter-row">
        <div class="dash-subfilter-item">
          <label><i class="fas fa-calendar-day"></i> เลือกวันที่ต้องการดู</label>
          <input type="date" class="dash-input" value="${esc(dashboardState.selectedDate)}" onchange="onDashboardDateChange(this.value)">
        </div>
        <div class="dash-subfilter-item">
          <label><i class="fas fa-bolt"></i> หรือเลือกจากวันที่มีประวัติใช้งาน (${availableDates.length} วัน)</label>
          <select class="dash-select" onchange="onDashboardDateChange(this.value)">
            ${availableDates.map(d => {
              const c = allRecords.filter(r => r.dateKey === d).reduce((s, r) => s + r.count, 0);
              return `<option value="${esc(d)}" ${d === dashboardState.selectedDate ? 'selected' : ''}>${formatThaiDateFull(d)} (${c} ครั้ง)</option>`;
            }).join('')}
          </select>
        </div>
      </div>`;
  } else if (dashboardState.periodMode === 'month') {
    periodSubControlHtml = `
      <div class="dash-subfilter-row">
        <div class="dash-subfilter-item">
          <label><i class="fas fa-calendar-alt"></i> เลือกเดือน/ปี พ.ศ.</label>
          <select class="dash-select" onchange="onDashboardMonthChange(this.value)">
            ${availableMonths.map(m => {
              const c = allRecords.filter(r => r.monthKey === m).reduce((s, r) => s + r.count, 0);
              return `<option value="${esc(m)}" ${m === dashboardState.selectedMonth ? 'selected' : ''}>${formatThaiMonthFull(m)} (${c.toLocaleString()} ครั้ง)</option>`;
            }).join('')}
          </select>
        </div>
      </div>`;
  } else if (dashboardState.periodMode === 'year') {
    periodSubControlHtml = `
      <div class="dash-subfilter-row">
        <div class="dash-subfilter-item">
          <label><i class="fas fa-calendar"></i> เลือกปี พ.ศ.</label>
          <select class="dash-select" onchange="onDashboardYearChange(this.value)">
            ${availableYears.map(y => {
              const c = allRecords.filter(r => r.yearKey === y).reduce((s, r) => s + r.count, 0);
              const be = (parseInt(y, 10) || 2026) + 543;
              return `<option value="${esc(y)}" ${y === dashboardState.selectedYear ? 'selected' : ''}>ปี พ.ศ. ${be} / ค.ศ. ${y} (${c.toLocaleString()} ครั้ง)</option>`;
            }).join('')}
          </select>
        </div>
      </div>`;
  } else if (dashboardState.periodMode === 'range') {
    periodSubControlHtml = `
      <div class="dash-subfilter-row">
        <div class="dash-subfilter-item">
          <label>ตั้งแต่วันที่</label>
          <input type="date" id="dashRangeStart" class="dash-input" value="${esc(dashboardState.rangeStart)}" onchange="onDashboardRangeChange()">
        </div>
        <div class="dash-subfilter-item">
          <label>ถึงวันที่</label>
          <input type="date" id="dashRangeEnd" class="dash-input" value="${esc(dashboardState.rangeEnd)}" onchange="onDashboardRangeChange()">
        </div>
      </div>`;
  }

  const displayedUnits = dashboardState.showAllUnits
    ? unitList
    : unitList.filter(u => u.count > 0);
  const maxUnitCount = Math.max(1, ...unitList.map(u => u.count));

  container.innerHTML = `
    <div class="dash-hero">
      <div class="dash-hero-top">
        <div class="dash-live-pill">
          <span class="dash-live-dot"></span>
          <span>REAL-TIME · GOOGLE SHEETS</span>
        </div>
        <div class="dash-hero-actions">
          <button type="button" class="dash-action-btn" id="dashSyncBtn" onclick="syncUsageDashboardNow(true)" title="ดึงข้อมูลล่าสุดจาก Google Sheet">
            <i class="fas fa-rotate ${dashboardState.isSyncing ? 'fa-spin' : ''}"></i> ซิงก์ข้อมูล
          </button>
          <button type="button" class="dash-action-btn dash-action-export" onclick="exportDashboardCsv()" title="ดาวน์โหลดรายงาน CSV">
            <i class="fas fa-file-csv"></i> Export CSV
          </button>
        </div>
      </div>
      <div class="dash-hero-main">
        <div>
          <h2 class="dash-hero-title"><i class="fas fa-chart-pie"></i> Dashboard สรุปผลการใช้งาน</h2>
          <p class="dash-hero-sub">${esc(getPeriodDescription(allRecords))}</p>
        </div>
        <div class="dash-hero-total-box">
          <span class="dash-hero-total-label">ยอดใช้งานในช่วงที่เลือก</span>
          <strong class="dash-hero-total-num">${totalCount.toLocaleString()}<span>ครั้ง</span></strong>
        </div>
      </div>
      <div class="dash-hero-footer">
        <span id="dashSyncStatusText"><i class="fas fa-table"></i> แหล่งข้อมูล: ${esc(dashboardState.syncSourceLabel)} · ซิงก์ล่าสุด ${esc(syncTimeStr)}</span>
        <span class="dash-hero-room-tag"><i class="fas fa-location-dot"></i> ห้องปัจจุบัน: <strong>${esc(currentRoom || 'ยังไม่ได้เลือก')}</strong></span>
      </div>
    </div>

    <div class="dash-filter-card">
      <div class="dash-filter-header">
        <span class="dash-filter-title"><i class="fas fa-filter"></i> เลือกช่วงเวลาแสดงสถิติ</span>
        <span class="dash-filter-hint">สลับดูรายวัน รายเดือน รายปี หรือกำหนดช่วงวันที่</span>
      </div>
      <div class="dash-period-tabs" role="tablist">
        <button type="button" class="dash-period-btn ${dashboardState.periodMode === 'all' ? 'active' : ''}" onclick="setDashboardPeriodMode('all')">
          <i class="fas fa-layer-group"></i> ทั้งหมด
        </button>
        <button type="button" class="dash-period-btn ${dashboardState.periodMode === 'day' ? 'active' : ''}" onclick="setDashboardPeriodMode('day')">
          <i class="fas fa-calendar-day"></i> รายวัน (วันที่)
        </button>
        <button type="button" class="dash-period-btn ${dashboardState.periodMode === 'month' ? 'active' : ''}" onclick="setDashboardPeriodMode('month')">
          <i class="fas fa-calendar-alt"></i> รายเดือน
        </button>
        <button type="button" class="dash-period-btn ${dashboardState.periodMode === 'year' ? 'active' : ''}" onclick="setDashboardPeriodMode('year')">
          <i class="fas fa-calendar"></i> รายปี
        </button>
        <button type="button" class="dash-period-btn ${dashboardState.periodMode === 'range' ? 'active' : ''}" onclick="setDashboardPeriodMode('range')">
          <i class="fas fa-sliders"></i> ช่วงวันที่
        </button>
      </div>
      ${periodSubControlHtml}
    </div>

    <div class="dash-kpi-grid">
      <div class="dash-kpi-card kpi-teal">
        <div class="dash-kpi-icon"><i class="fas fa-chart-line"></i></div>
        <div class="dash-kpi-body">
          <span class="dash-kpi-label">ยอดการใช้งานรวม</span>
          <strong class="dash-kpi-value">${totalCount.toLocaleString()} <small>ครั้ง</small></strong>
          <span class="dash-kpi-meta">เดือนนี้ ${currentMonthCount.toLocaleString()} ครั้ง · วันนี้ ${todayCount.toLocaleString()} ครั้ง</span>
        </div>
      </div>

      <div class="dash-kpi-card kpi-emerald">
        <div class="dash-kpi-icon"><i class="fas fa-hospital-user"></i></div>
        <div class="dash-kpi-body">
          <span class="dash-kpi-label">หน่วยที่ใช้งานสูงสุด</span>
          <strong class="dash-kpi-value">${esc(topUnit.unit)}</strong>
          <span class="dash-kpi-meta">${topUnit.count.toLocaleString()} ครั้ง (${topUnit.pct.toFixed(1)}% ของช่วงนี้)</span>
        </div>
      </div>

      <div class="dash-kpi-card kpi-cyan">
        <div class="dash-kpi-icon"><i class="fas fa-door-open"></i></div>
        <div class="dash-kpi-body">
          <span class="dash-kpi-label">ห้องตรวจที่ใช้งานสูงสุด</span>
          <strong class="dash-kpi-value">${esc(topRoom.room)}</strong>
          <span class="dash-kpi-meta">${esc(topRoom.unit)} · ${topRoom.count.toLocaleString()} ครั้ง (${topRoom.pct.toFixed(1)}%)</span>
        </div>
      </div>

      <div class="dash-kpi-card kpi-purple">
        <div class="dash-kpi-icon"><i class="fas fa-award"></i></div>
        <div class="dash-kpi-body">
          <span class="dash-kpi-label">จุดบริการ & ค่าเฉลี่ย</span>
          <strong class="dash-kpi-value">${activeRooms.length} <small>ห้องตรวจ</small></strong>
          <span class="dash-kpi-meta">เฉลี่ย ${avgPerDay} ครั้ง/วัน ${peakDay ? `· สูงสุด ${peakDay.label} (${peakDay.count})` : ''}</span>
        </div>
      </div>
    </div>

    <div class="dash-section-card">
      <div class="dash-section-header">
        <div>
          <div class="dash-section-title"><i class="fas fa-chart-column"></i> แนวโน้มยอดการใช้งานตามช่วงเวลา</div>
          <div class="dash-section-sub">แสดงเปรียบเทียบยอดการใช้งานแยกตาม วันที่ · เดือน · ปี</div>
        </div>
        <div class="dash-granularity-switch">
          <button type="button" class="dash-gran-btn ${dashboardState.trendGranularity === 'day' ? 'active' : ''}" onclick="setDashboardTrendGranularity('day')">วันที่</button>
          <button type="button" class="dash-gran-btn ${dashboardState.trendGranularity === 'month' ? 'active' : ''}" onclick="setDashboardTrendGranularity('month')">เดือน</button>
          <button type="button" class="dash-gran-btn ${dashboardState.trendGranularity === 'year' ? 'active' : ''}" onclick="setDashboardTrendGranularity('year')">ปี</button>
        </div>
      </div>

      ${trendBuckets.length ? `
        <div class="dash-chart-scroll">
          <div class="dash-bar-chart" style="min-width: ${Math.max(100, trendBuckets.length * 46)}px">
            ${trendBuckets.map(b => {
              const heightPct = Math.max(8, Math.round((b.count / maxBucketCount) * 100));
              const isPeak = b.count === maxBucketCount && b.count > 0;
              return `
                <div class="dash-bar-col ${isPeak ? 'is-peak' : ''}" title="${esc(b.fullLabel)}: ${b.count} ครั้ง"
                     onclick="${dashboardState.trendGranularity === 'day' ? `setDashboardPeriodMode('day');onDashboardDateChange('${ea(b.key)}')` : (dashboardState.trendGranularity === 'month' ? `setDashboardPeriodMode('month');onDashboardMonthChange('${ea(b.key)}')` : '')}">
                  <span class="dash-bar-val">${b.count}</span>
                  <div class="dash-bar-track">
                    <div class="dash-bar-fill" style="height:${heightPct}%"></div>
                  </div>
                  <span class="dash-bar-label">${esc(b.label)}</span>
                </div>`;
            }).join('')}
          </div>
        </div>
        <div class="dash-chart-caption">
          <span><i class="fas fa-hand-pointer"></i> แตะที่แท่งกราฟเพื่อเจาะลึกดูข้อมูลเฉพาะวันหรือเดือนนั้น</span>
          <span>รวม ${trendBuckets.length} ช่วงเวลา · สูงสุด ${maxBucketCount.toLocaleString()} ครั้ง</span>
        </div>
      ` : `<div class="dash-empty">ไม่มีข้อมูลในช่วงเวลาที่เลือก</div>`}

      <div class="dash-shift-box">
        <div class="dash-shift-title"><i class="fas fa-clock"></i> สัดส่วนการใช้งานตามช่วงเวรปฏิบัติงาน (เวลาประเทศไทย)</div>
        <div class="dash-shift-grid">
          ${shifts.map(s => `
            <div class="dash-shift-item">
              <div class="dash-shift-top">
                <span><i class="fas ${s.icon}" style="color:${s.color}"></i> ${esc(s.label)}</span>
                <strong>${s.count.toLocaleString()} ครั้ง (${s.pct.toFixed(0)}%)</strong>
              </div>
              <div class="dash-progress-track">
                <div class="dash-progress-fill" style="width:${Math.min(100, s.pct)}%;background:${s.color}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="dash-section-card">
      <div class="dash-section-header">
        <div>
          <div class="dash-section-title"><i class="fas fa-sitemap"></i> สถิติแยกตามหน่วยบริการ (แต่ละหน่วย)</div>
          <div class="dash-section-sub">สรุปยอดการใช้งานของแต่ละหน่วย พร้อมแสดงยอดแยกตามห้องตรวจในสังกัด (คลิกที่หน่วยเพื่อกรองดูเฉพาะหน่วย)</div>
        </div>
        <button type="button" class="dash-toggle-units-btn" onclick="toggleDashboardShowAllUnits()">
          <i class="fas ${dashboardState.showAllUnits ? 'fa-eye' : 'fa-filter'}"></i>
          ${dashboardState.showAllUnits ? 'แสดงครบทุกหน่วย (14)' : 'เฉพาะหน่วยที่มียอดใช้'}
        </button>
      </div>

      <div class="dash-unit-list">
        ${displayedUnits.map((u, idx) => {
          const barWidth = u.count > 0 ? Math.max(4, (u.count / maxUnitCount) * 100) : 0;
          const isSelected = dashboardState.selectedUnit === u.unit;
          return `
            <div class="dash-unit-card ${u.count === 0 ? 'unit-zero' : ''} ${isSelected ? 'unit-selected' : ''}"
                 onclick="setDashboardUnitFilter('${isSelected ? 'ALL' : ea(u.unit)}')">
              <div class="dash-unit-top">
                <div class="dash-unit-name-wrap">
                  <span class="dash-unit-rank">${idx + 1}</span>
                  <div class="dash-unit-icon"><i class="fas ${u.icon}"></i></div>
                  <div>
                    <div class="dash-unit-title">${esc(u.unit)}</div>
                    <div class="dash-unit-sub">${u.activeRoomsCount} ห้องที่มีการใช้งาน · รวม ${u.roomsList.length} จุดบริการ</div>
                  </div>
                </div>
                <div class="dash-unit-stats">
                  <strong class="dash-unit-count">${u.count.toLocaleString()} <small>ครั้ง</small></strong>
                  <span class="dash-unit-pct">${u.pct.toFixed(1)}%</span>
                </div>
              </div>
              <div class="dash-progress-track">
                <div class="dash-progress-fill" style="width:${barWidth}%"></div>
              </div>
              <div class="dash-unit-rooms">
                ${u.roomsList.length ? u.roomsList.map(r => `
                  <span class="dash-room-chip ${r.count > 0 ? 'active' : 'inactive'}">
                    ${esc(r.room)} <strong>${r.count.toLocaleString()}</strong>
                  </span>
                `).join('') : '<span class="dash-room-chip inactive">ยังไม่มีรายการระบุในหมวดอื่นๆ</span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="dash-section-card dash-other-card">
      <div class="dash-section-header">
        <div>
          <div class="dash-section-title"><i class="fas fa-building-user"></i> รายละเอียดหมวด “อื่นๆ” (ห้องตรวจ / หน่วยงานที่ระบุเพิ่มเติม)</div>
          <div class="dash-section-sub">รวบรวมจุดบริการและหอผู้ป่วยที่บุคลากรพิมพ์ระบุเองนอกเหนือจากรายการห้องตรวจมาตรฐาน</div>
        </div>
        <span class="dash-badge-pill">${customRooms.reduce((s, r) => s + r.count, 0).toLocaleString()} ครั้ง · ${customRooms.length} หน่วยงาน</span>
      </div>
      ${customRooms.length ? `
        <div class="dash-other-grid">
          ${customRooms.map(r => `
            <div class="dash-other-item">
              <div class="dash-other-info">
                <span class="dash-other-name"><i class="fas fa-location-dot"></i> ${esc(r.room)}</span>
                <span class="dash-other-date">ล่าสุด: ${formatThaiDateShort(r.lastDateKey)}</span>
              </div>
              <div class="dash-other-right">
                <strong>${r.count.toLocaleString()} ครั้ง</strong>
                <small>${r.pct.toFixed(1)}%</small>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `<div class="dash-empty">ไม่มีรายการในหมวดอื่นๆ สำหรับช่วงเวลานี้</div>`}
    </div>

    <div class="dash-section-card">
      <div class="dash-section-header">
        <div>
          <div class="dash-section-title"><i class="fas fa-list-ol"></i> อันดับการใช้งานแต่ละห้องตรวจ / จุดบริการ</div>
          <div class="dash-section-sub">เปรียบเทียบยอดการใช้งานรายห้องตรวจ พร้อมตัวกรองตามหน่วยบริการและค้นหาชื่อห้อง</div>
        </div>
      </div>

      <div class="dash-room-controls">
        <div class="dash-search-wrap">
          <i class="fas fa-search"></i>
          <input type="text" id="dashRoomSearchInput" class="dash-input" placeholder="ค้นหาห้องตรวจ เช่น OPD 1, OPD 2, ER, NAC, Ward..."
                 value="${esc(dashboardState.roomSearch)}" oninput="onDashboardRoomSearch(this.value)">
        </div>
        <select class="dash-select" onchange="setDashboardUnitFilter(this.value)">
          <option value="ALL" ${dashboardState.selectedUnit === 'ALL' ? 'selected' : ''}>ทุกหน่วยบริการ (${roomList.length} ห้อง)</option>
          ${unitList.map(u => `<option value="${esc(u.unit)}" ${dashboardState.selectedUnit === u.unit ? 'selected' : ''}>${esc(u.unit)} (${u.count} ครั้ง)</option>`).join('')}
        </select>
      </div>

      <div id="dashRoomTableContainer"></div>
    </div>

    <div class="dash-section-card">
      <div class="dash-section-header">
        <div>
          <div class="dash-section-title"><i class="fas fa-clock-rotate-left"></i> บันทึกการใช้งานล่าสุด (Real-Time Activity Feed)</div>
          <div class="dash-section-sub">รายการเข้าใช้งานล่าสุดจาก Google Sheet และการใช้งานสดในขณะนี้</div>
        </div>
        <span class="dash-badge-pill">แสดง ${Math.min(15, filteredRecords.length)} จาก ${filteredRecords.length.toLocaleString()} รายการ</span>
      </div>
      ${filteredRecords.length ? `
        <div class="dash-activity-list">
          ${filteredRecords.slice(0, 15).map((r, i) => `
            <div class="dash-activity-row ${i === 0 ? 'latest' : ''}">
              <div class="dash-activity-dot"></div>
              <div class="dash-activity-main">
                <div class="dash-activity-room">
                  <strong>${esc(r.room)}</strong>
                  <span class="dash-unit-tag ${r.isCustom ? 'custom' : ''}">${esc(r.unit)}</span>
                </div>
                <div class="dash-activity-time"><i class="far fa-clock"></i> ${esc(formatThaiDateTime(r.ts, r.dateKey))}</div>
              </div>
              <div class="dash-activity-count">+${r.count} ครั้ง</div>
            </div>
          `).join('')}
        </div>
      ` : `<div class="dash-empty">ยังไม่มีประวัติการใช้งานในช่วงเวลาที่เลือก</div>`}
    </div>
  `;

  renderDashboardRoomSection(roomList);
}

function renderDashboardRoomSection(precomputedRooms) {
  const wrap = document.getElementById('dashRoomTableContainer');
  if (!wrap) return;
  const allRecords = getAllNormalizedUsageRecords();
  const filteredRecords = getFilteredDashboardRecords(allRecords);
  const { roomList } = precomputedRooms ? { roomList: precomputedRooms } : computeUnitAndRoomStats(filteredRecords);

  const q = dashboardState.roomSearch.toLowerCase();
  const unitFilter = dashboardState.selectedUnit;

  const matching = roomList.filter(r => {
    if (unitFilter !== 'ALL' && r.unit !== unitFilter) return false;
    if (!dashboardState.showAllUnits && r.count === 0) return false;
    if (q && !r.room.toLowerCase().includes(q) && !r.unit.toLowerCase().includes(q)) return false;
    return true;
  });

  const maxRoomCount = Math.max(1, ...matching.map(r => r.count));

  if (!matching.length) {
    wrap.innerHTML = `<div class="dash-empty">ไม่พบห้องตรวจที่ตรงกับเงื่อนไขการค้นหา</div>`;
    return;
  }

  wrap.innerHTML = `
    <div class="dash-room-table-wrap">
      <table class="dash-room-table">
        <thead>
          <tr>
            <th style="width:48px">#</th>
            <th>ห้องตรวจ / จุดบริการ</th>
            <th>หน่วยบริการ</th>
            <th>สัดส่วน</th>
            <th style="text-align:right">ยอดใช้ (ครั้ง)</th>
          </tr>
        </thead>
        <tbody>
          ${matching.map((r, idx) => {
            const rankBadge = idx === 0 && r.count > 0 ? '🥇' : (idx === 1 && r.count > 0 ? '🥈' : (idx === 2 && r.count > 0 ? '🥉' : `${idx + 1}`));
            const barW = r.count > 0 ? Math.max(5, (r.count / maxRoomCount) * 100) : 0;
            return `
              <tr class="${r.count === 0 ? 'row-zero' : ''}">
                <td class="col-rank">${rankBadge}</td>
                <td>
                  <div class="dash-table-room">${esc(r.room)}</div>
                  ${r.lastDateKey ? `<div class="dash-table-date">ใช้ล่าสุด ${formatThaiDateShort(r.lastDateKey)}</div>` : '<div class="dash-table-date">ยังไม่มีประวัติในช่วงนี้</div>'}
                </td>
                <td><span class="dash-unit-tag ${r.isCustom ? 'custom' : ''}">${esc(r.unit)}</span></td>
                <td style="min-width:95px">
                  <div class="dash-mini-bar-wrap">
                    <div class="dash-mini-bar" style="width:${barW}%"></div>
                  </div>
                  <span class="dash-mini-pct">${r.pct.toFixed(1)}%</span>
                </td>
                <td style="text-align:right">
                  <strong class="dash-table-count">${r.count.toLocaleString()}</strong>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function exportDashboardCsv() {
  const allRecords = getAllNormalizedUsageRecords();
  const filteredRecords = getFilteredDashboardRecords(allRecords);
  const { unitList, roomList } = computeUnitAndRoomStats(filteredRecords);

  const lines = [];
  lines.push('รายงานสรุปผลการใช้งาน HEAL Lingua (Healthcare Empathy Across Languages)');
  lines.push(`ช่วงเวลา,"${getPeriodDescription(allRecords)}"`);
  lines.push(`ยอดใช้งานรวม,${filteredRecords.reduce((s, r) => s + r.count, 0)}`);
  lines.push('');
  lines.push('--- สรุปตามหน่วยบริการ ---');
  lines.push('ลำดับ,หน่วยบริการ,จำนวนครั้ง,สัดส่วน (%)');
  unitList.forEach((u, i) => {
    lines.push(`${i + 1},"${u.unit.replace(/"/g, '""')}",${u.count},${u.pct.toFixed(2)}`);
  });
  lines.push('');
  lines.push('--- สรุปตามห้องตรวจ / จุดบริการ ---');
  lines.push('ลำดับ,ห้องตรวจ,หน่วยบริการ,ประเภท,จำนวนครั้ง,สัดส่วน (%),ใช้งานล่าสุด');
  roomList.forEach((r, i) => {
    lines.push(`${i + 1},"${r.room.replace(/"/g, '""')}","${r.unit.replace(/"/g, '""')}",${r.isCustom ? 'อื่นๆ (ระบุเอง)' : 'ห้องมาตรฐาน'},${r.count},${r.pct.toFixed(2)},${r.lastDateKey || '-'}`);
  });
  lines.push('');
  lines.push('--- ประวัติการใช้งานรายครั้ง (Raw Log) ---');
  lines.push('event_id,ห้องตรวจ,หน่วยบริการ,วันที่ (YYYY-MM-DD),เวลา (UTC),จำนวนครั้ง');
  filteredRecords.forEach(r => {
    lines.push(`"${r.id}","${r.room.replace(/"/g, '""')}","${r.unit.replace(/"/g, '""')}",${r.dateKey},${r.ts},${r.count}`);
  });

  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `HEAL-Lingua-Usage-Report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function openUsageDashboardTab() {
  const btn = document.querySelector('.tab-btn[data-tab="dashboard"]');
  if (typeof switchTab === 'function') {
    switchTab('dashboard', btn);
  }
  renderUsageDashboard();
  syncUsageDashboardNow(false);
  document.querySelector('.tab-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initUsageDashboard() {
  dashboardState.remoteRecords = loadCachedRemoteRecords();
  dashboardState.lastSyncTime = new Date();

  try {
    if (typeof BroadcastChannel !== 'undefined') {
      dashboardState.broadcastChannel = new BroadcastChannel('heal_usage_realtime_v1');
      dashboardState.broadcastChannel.onmessage = (ev) => {
        if (ev?.data?.type === 'usage-event') {
          dashboardState.lastSyncTime = new Date();
          renderUsageDashboard();
        }
      };
    }
  } catch (e) {}

  window.addEventListener('storage', (ev) => {
    if (ev.key === HEAL_LIVE_EVENTS_STORAGE_KEY || ev.key === HEAL_REMOTE_CACHE_STORAGE_KEY) {
      dashboardState.remoteRecords = loadCachedRemoteRecords();
      dashboardState.lastSyncTime = new Date();
      renderUsageDashboard();
    }
  });

  renderUsageDashboard();
  setTimeout(() => syncUsageDashboardNow(false), 600);

  if (dashboardState.autoRefreshTimer) clearInterval(dashboardState.autoRefreshTimer);
  dashboardState.autoRefreshTimer = setInterval(() => {
    if (!document.hidden) {
      syncUsageDashboardNow(false);
    }
  }, 30000);
}

window.addEventListener('DOMContentLoaded', initUsageDashboard);
