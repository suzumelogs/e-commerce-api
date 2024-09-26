import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly webhook;
    constructor(webhook: WebhookService);
    webhookHandler(req: any, signature: string): Promise<{
        received: boolean;
    }>;
}
