import { BoxContext, IBoxStyle } from "@prague/app-ui";

export class FlowViewContext extends BoxContext {
    constructor(measure2d: CanvasRenderingContext2D, style: IBoxStyle, public readonly services: Map<string, any>) {
        super(measure2d, style);
    }
}
