import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) return badRequest(new InvalidParamError('email'))

      return { statusCode: 201, body: true }
    } catch (err) {
      return { statusCode: 500, body: new ServerError() }
    }
  }
}
