"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATMStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
class ATMStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Lambda para depositar dinero
        const lambdaDepositarDinero = new aws_lambda_1.Function(this, 'LambdaDepositarDinero', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'deposito.handler',
            code: aws_lambda_1.Code.fromAsset('lambda'),
        });
        //Lambda para retirar dinero
        const lambdaRetirarDinero = new aws_lambda_1.Function(this, 'LambdaRetirarDinero', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'retiro.handler',
            code: aws_lambda_1.Code.fromAsset('lambda'),
        });
        // Lambda para cambiar la clave de la tarjeta de debito
        const lambdaCambiarClave = new aws_lambda_1.Function(this, 'LambdaCambiarClave', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'cambiarClave.handler',
            code: aws_lambda_1.Code.fromAsset('lambda'),
        });
        // API Gateway para exponer las funciones
        const api = new aws_apigateway_1.RestApi(this, 'ApiGateway', {
            restApiName: 'ApiGateway-ATM',
        });
        // Crear los recursos
        // /atm/depositar
        // /atm/retirar
        // /atm/cambiarClave
        const resource = api.root.addResource('atm');
        resource.addResource('depositar').addMethod('POST', new aws_apigateway_1.LambdaIntegration(lambdaDepositarDinero));
        resource.addResource('retirar').addMethod('POST', new aws_apigateway_1.LambdaIntegration(lambdaRetirarDinero));
        resource.addResource('cambiarClave').addMethod('POST', new aws_apigateway_1.LambdaIntegration(lambdaCambiarClave));
    }
}
exports.ATMStack = ATMStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWNkay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwaS1jZGstc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBQ2hELCtEQUF1RjtBQUN2Rix1REFBaUU7QUFHakUsTUFBYSxRQUFTLFNBQVEsbUJBQUs7SUFDakMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QiwrQkFBK0I7UUFDL0IsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3hFLE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7WUFDNUIsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixJQUFJLEVBQUUsaUJBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQy9CLENBQUMsQ0FBQTtRQUVGLDRCQUE0QjtRQUM1QixNQUFNLG1CQUFtQixHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDcEUsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztZQUM1QixPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDL0IsQ0FBQyxDQUFBO1FBRUYsdURBQXVEO1FBQ3ZELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUNsRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztTQUMvQixDQUFDLENBQUE7UUFHRix5Q0FBeUM7UUFDekMsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUMsV0FBVyxFQUFFLGdCQUFnQjtTQUM5QixDQUFDLENBQUE7UUFFRixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksa0NBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFBO1FBQ2pHLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLGtDQUFpQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQTtRQUM3RixRQUFRLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQ0FBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7SUFVbkcsQ0FBQztDQUNGO0FBakRELDRCQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XHJcbmltcG9ydCB7IExhbWJkYUludGVncmF0aW9uLCBMYW1iZGFSZXN0QXBpLCBSZXN0QXBpIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uLCBDb2RlLCBSdW50aW1lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBVE1TdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIC8vIExhbWJkYSBwYXJhIGRlcG9zaXRhciBkaW5lcm9cclxuICAgIGNvbnN0IGxhbWJkYURlcG9zaXRhckRpbmVybyA9IG5ldyBGdW5jdGlvbih0aGlzLCAnTGFtYmRhRGVwb3NpdGFyRGluZXJvJywge1xyXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18yMF9YLFxyXG4gICAgICBoYW5kbGVyOiAnZGVwb3NpdG8uaGFuZGxlcicsXHJcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcclxuICAgIH0pXHJcblxyXG4gICAgLy9MYW1iZGEgcGFyYSByZXRpcmFyIGRpbmVyb1xyXG4gICAgY29uc3QgbGFtYmRhUmV0aXJhckRpbmVybyA9IG5ldyBGdW5jdGlvbih0aGlzLCAnTGFtYmRhUmV0aXJhckRpbmVybycsIHtcclxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcclxuICAgICAgaGFuZGxlcjogJ3JldGlyby5oYW5kbGVyJyxcclxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBMYW1iZGEgcGFyYSBjYW1iaWFyIGxhIGNsYXZlIGRlIGxhIHRhcmpldGEgZGUgZGViaXRvXHJcbiAgICBjb25zdCBsYW1iZGFDYW1iaWFyQ2xhdmUgPSBuZXcgRnVuY3Rpb24odGhpcywgJ0xhbWJkYUNhbWJpYXJDbGF2ZScsIHtcclxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMjBfWCxcclxuICAgICAgaGFuZGxlcjogJ2NhbWJpYXJDbGF2ZS5oYW5kbGVyJyxcclxuICAgICAgY29kZTogQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxyXG4gICAgfSlcclxuXHJcblxyXG4gICAgLy8gQVBJIEdhdGV3YXkgcGFyYSBleHBvbmVyIGxhcyBmdW5jaW9uZXNcclxuICAgIGNvbnN0IGFwaSA9IG5ldyBSZXN0QXBpKHRoaXMsICdBcGlHYXRld2F5Jywge1xyXG4gICAgICByZXN0QXBpTmFtZTogJ0FwaUdhdGV3YXktQVRNJyxcclxuICAgIH0pXHJcblxyXG4gICAgLy8gQ3JlYXIgbG9zIHJlY3Vyc29zXHJcbiAgICAvLyAvYXRtL2RlcG9zaXRhclxyXG4gICAgLy8gL2F0bS9yZXRpcmFyXHJcbiAgICAvLyAvYXRtL2NhbWJpYXJDbGF2ZVxyXG4gICAgY29uc3QgcmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnYXRtJylcclxuICAgIHJlc291cmNlLmFkZFJlc291cmNlKCdkZXBvc2l0YXInKS5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRGVwb3NpdGFyRGluZXJvKSlcclxuICAgIHJlc291cmNlLmFkZFJlc291cmNlKCdyZXRpcmFyJykuYWRkTWV0aG9kKCdQT1NUJywgbmV3IExhbWJkYUludGVncmF0aW9uKGxhbWJkYVJldGlyYXJEaW5lcm8pKVxyXG4gICAgcmVzb3VyY2UuYWRkUmVzb3VyY2UoJ2NhbWJpYXJDbGF2ZScpLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBMYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFDYW1iaWFyQ2xhdmUpKVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcbiAgfVxyXG59XHJcbiJdfQ==