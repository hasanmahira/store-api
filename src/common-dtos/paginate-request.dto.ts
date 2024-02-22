import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { decorate } from 'ts-mixer';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import {
  Like,
  Not,
  ILike,
  Any,
  Between,
  Equal,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

function decodeURLAndConvertToJSON(val) {
  if (!val) {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return undefined;
  }
}

function parseWhereObj(obj) {
  if (Array.isArray(obj)) {
    return obj?.map((o) => parseWhereObj(o));
  } else if (typeof obj === 'object') {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = parseWhereObj(obj[key]);
    }
    return newObj;
  } else if (typeof obj === 'number') {
    return obj;
  } else {
    let returnValue: any = obj;
    const regex = /(.+)\((.*)\)/;
    const like = obj?.match(regex);
    if (like?.[1]?.length) {
      const operator = like?.[1];
      const value = like?.[2]?.length ? eval(like?.[2]) : '';
      switch (operator) {
        case 'Like':
          returnValue = Like(value);
          break;
        case 'Not':
          returnValue = Not(value);
          break;
        case 'ILike':
          returnValue = ILike(value);
          break;
        case 'Any':
          returnValue = Any(value);
          break;
        case 'Between':
          returnValue = Between(value?.[0], value?.[1]);
          break;
        case 'Equal':
          returnValue = Equal(value);
          break;
        case 'In':
          returnValue = In(value);
          break;
        case 'IsNull':
          returnValue = IsNull();
          break;
        case 'LessThan':
          returnValue = LessThan(value);
          break;
        case 'LessThanOrEqual':
          returnValue = LessThanOrEqual(value);
          break;
        case 'MoreThan':
          returnValue = MoreThan(value);
          break;
        case 'MoreThanOrEqual':
          returnValue = MoreThanOrEqual(value);
          break;
      }
    }
    return returnValue;
  }
}

export class PaginateRequestDto<Entity> {
  @decorate(Expose())
  @decorate(Type(() => Number))
  @decorate(Transform(({ value }) => value || 1))
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: false, default: 1, example: 1 }))
  page: number;

  @decorate(Expose())
  @decorate(Type(() => Number))
  @decorate(Transform(({ value }) => (value > 100 ? 100 : value || 10)))
  @decorate(IsNotEmpty())
  @decorate(IsNumber())
  @decorate(IsInt())
  @decorate(ApiProperty({ type: Number, required: false, default: 10, example: 10, maximum: 100 }))
  limit: number;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(
    Transform(({ obj }) => {
      return decodeURLAndConvertToJSON(obj?.order);
    }),
  )
  @decorate(
    ApiProperty({
      type: String,
      required: false,
      description: `
Example:  

    //Create an object that represents the desired order. For example:
    const order = {
      id: "ASC",
      created_at: "DESC"
    }
    
    //Use JSON.stringify() to convert the object to a JSON string:
    const orderJson = JSON.stringify(order);
    
    //Use encodeURIComponent() to encode the JSON string for use in a URL query parameter:
    const encodedOrder = encodeURIComponent(orderJson);
    
    //Append the encoded order to the URL query string, with a key that represents the order parameter name. For example:
    let url = "https://example.com/api/v1/entities";
    url += "?order=" + encodedOrder;

\nmore on https://orkhan.gitbook.io/typeorm/docs/find-options
  `,
    }),
  )
  order?: FindOptionsOrder<Entity>;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(
    Transform(({ obj }) => {
      return decodeURLAndConvertToJSON(obj?.select);
    }),
  )
  @decorate(
    ApiProperty({
      type: String,
      required: false,
      description: `
Example:  

    //Create an object that represents the desired select. For example:
    const select = {
      id: true,
      name: true,
      created_at: false,
    }

    //Use JSON.stringify() to convert the object to a JSON string:
    const selectJson = JSON.stringify(select);
    
    //Use encodeURIComponent() to encode the JSON string for use in a URL query parameter:
    const encodedSelect = encodeURIComponent(selectJson);
    
    //Append the encoded select to the URL query string, with a key that represents the select parameter name. For example:
    let url = "https://example.com/api/v1/entities";
    url += "?select=" + encodedSelect;

\nmore on https://orkhan.gitbook.io/typeorm/docs/find-options
  `,
    }),
  )
  select?: FindOptionsSelect<Entity>;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(
    Transform(({ obj }) => {
      return decodeURLAndConvertToJSON(obj?.relations);
    }),
  )
  @decorate(
    ApiProperty({
      type: String,
      required: false,
      description: `
Example:  

    //Create an object that represents the desired relations. For example:
    relations = {
      profile: true,
      photos: true,
      videos: {
        videoAttributes: true,
      },
    }

    //Use JSON.stringify() to convert the object to a JSON string:
    const relationsJson = JSON.stringify(relations);
    
    //Use encodeURIComponent() to encode the JSON string for use in a URL query parameter:
    const encodedRelations = encodeURIComponent(relationsJson);
    
    //Append the encoded relations to the URL query string, with a key that represents the relations parameter name. For example:
    let url = "https://example.com/api/v1/entities";
    url += "?relations=" + encodedRelations;

\nmore on https://orkhan.gitbook.io/typeorm/docs/find-options
  `,
    }),
  )
  relations?: FindOptionsRelations<Entity>;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(
    Transform(({ obj }) => {
      const objt = decodeURLAndConvertToJSON(obj?.where);

      if (!objt) {
        return undefined;
      }

      return parseWhereObj(objt);
    }),
  )
  @decorate(
    ApiProperty({
      type: String,
      required: false,
      description: `
Example:  
\n
    //Create an object that represents the desired where. For example:
    const where = {
      name: "Like('Type')",
      name: "ILike('Type')",
      name: "Not('Type')",
      name: "Any('["Type1","Type2"]')",
      name: "Between('["from","to"]')",
      name: "Equal('Type')",
      name: "In('["Type1","Type2"]')",
      name: "IsNull()",
      name: "LessThan('Type')",
      name: "LessThanOrEqual('Type')",
      name: "MoreThan('Type')",
      name: "MoreThanOrEqual('Type')",
      name: "TypeORM",
      project: {
           name: "TypeORM",
           initials: "TORM",
      }
    }

    //Use JSON.stringify() to convert the object to a JSON string:
    const whereJson = JSON.stringify(where);
    
    //Use encodeURIComponent() to encode the JSON string for use in a URL query parameter:
    const encodedWhere = encodeURIComponent(whereJson);
    
    //Append the encoded where to the URL query string, with a key that represents the where parameter name. For example:
    let url = "https://example.com/api/v1/entities";
    url += "?where=" + encodedWhere;

\nmore on https://orkhan.gitbook.io/typeorm/docs/find-options
  `,
    }),
  )
  where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>;

  @decorate(Expose())
  @decorate(IsOptional())
  @decorate(
    Transform(({ value }) => {
      return typeof value === 'undefined' ? true : [true, 'enabled', 'true'].indexOf(value) > -1;
    }),
  )
  @decorate(IsBoolean())
  @decorate(ApiProperty({ type: Boolean, required: false, default: true, example: true }))
  cache?: boolean;
}

//const p = encodeURIComponent(JSON.stringify({ id: 'LessThan(2)' }));
//console.log(p);
