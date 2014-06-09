require 'rubygems'
require 'sinatra'
require 'awesome_print'
require 'haml'
require 'json'

DATA_PATH = "./data.jsonp"

set :haml, :format => :html5

get '/' do
  haml :index
end

get '/data' do
  callback = params.delete('callback')
  json = IO.readlines(DATA_PATH).map {|l| l.chomp}.to_json

  content_type :js
  response = "#{callback}(#{json})"
end